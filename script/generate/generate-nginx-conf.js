const fs = require("fs");
const os = require("os");
const path = require("path");
const { exec } = require("child_process");

const homeDir = os.homedir();
const projectDir = "talkn-ch-gateway";
const certsDir = "talkn-certs";
const INPUT_JSON_FILE = path.join(__dirname + "/common/src", "ch-config.json");
const NGINX_CONF_PATH = path.join(__dirname, "nginx", "nginx.conf");

// 引数の値を取得
const args = process.argv.slice(2);
const topCh = args[0] || "/";

console.info(topCh);

// JSONデータを読み込む
let jsonData = JSON.parse(fs.readFileSync(INPUT_JSON_FILE, "utf8"));

if (topCh !== "/") {
  for (const i in jsonData.children) {
    const topCnSetting = jsonData.children[i];
    if (topCnSetting.nginx.location === topCh) {
      jsonData = topCnSetting;
      break;
    }
  }
}

let nginxConfig = `
# user  staff;
worker_processes  1;

error_log  ${homeDir}/${projectDir}/logs/error.log;
pid ${homeDir}/${projectDir}/nginx/nginx.pid;

worker_rlimit_nofile 83000;

events {
  worker_connections 4096;
}

http {
  server {
    server_name ${jsonData.gateway.host};
    listen ${jsonData.gateway.port} ssl;
    access_log  ${homeDir}/${projectDir}/logs/access.log;

    ssl_certificate     ${homeDir}/${certsDir}/localhost.crt;
    ssl_certificate_key ${homeDir}/${certsDir}/localhost.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header Access-Control-Allow-Origin "*";
    proxy_set_header Access-Control-Allow-Methods "POST, GET, PUT, DELETE, OPTIONS";
    proxy_set_header Access-Control-Allow-Headers "DNT, X-Mx-ReqToken, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type";
    proxy_set_header Access-Control-Allow-Credentials true;
`;

// トップレベルの location を追加
nginxConfig += `
    location ${jsonData.nginx.location} {
      proxy_pass https://${jsonData.nginx.host}:${
  jsonData.nginx.port
}/socket.io/${jsonData.nginx.location === "/" ? "" : jsonData.nginx.location};
    }
`;

// 再帰的に children を処理して nginx.conf に追加する関数
function appendLocations(data, prefix = "") {
  data.children.forEach((child) => {
    const fullPath = prefix + child.nginx.location;
    nginxConfig += `
    location /${fullPath} {
      proxy_pass https://${child.nginx.host}:${child.nginx.port}/socket.io/${fullPath};
    }
`;
    if (child.children && child.children.length > 0) {
      appendLocations(child, fullPath); // 再帰的に子要素を処理
    }
  });
}

// トップレベルから children の処理を開始
appendLocations(jsonData);

// nginx.conf の終了部分を追加
nginxConfig += `
  }
}
`;

// nginx.conf ファイルに書き込む
fs.writeFileSync(NGINX_CONF_PATH, nginxConfig, "utf8");
