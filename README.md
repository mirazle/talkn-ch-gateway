# 環境構築(macOS Sonoma 14.4.1)

dmg をインストールしてデーモンを実行
https://docs.docker.com/desktop/install/mac-install/

```
brew install docker
brew install docker-compose
docker login
docker-compose build
docker-compose up
```

# brew インストール

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

brew tap openresty/bre
brew install openresty

# 関連リポジトリ

https://github.com/mirazle/talkn-common.git
https://github.com/mirazle/talkn-server.git
https://github.com/mirazle/talkn-api.git

# ローカル開発

## open-resty

```
curl -O https://openresty.org/download/openresty-1.21.4.2.tar.gz
tar -zxvf openresty-1.21.4.2.tar.gz
cd openresty-1.21.4.2
brew install pcre openssl zlib
./configure --with-pcre-jit --with-http_ssl_module --with-http_v2_module --with-cc-opt="-I$(brew --prefix openssl)/include" --with-ld-opt="-L$(brew --prefix openssl)/lib"
make -j$(nproc)
sudo make install

echo 'export PATH=/usr/local/openresty/bin:$PATH' >> ~/.bash_profile
export PATH=$PATH:/usr/local/openresty/nginx/sbin
source ~/.bash_profile
```

```
brew tap openresty/brew
brew install openresty
brew install openresty-debug
brew install lua
brew install luarocks

luarocks install lua-resty-http
luarocks install lua-resty-core
opm get openresty/lua-resty-core

openresty -v
openresty -c $(pwd)/nginx/nginx.conf
openresty -s reload
lsof -i :10443
kill -9 $(lsof -t -i:10443)

openresty -s stop
```

下記で取得出来る LUA_PATH, LUA_CPATH を export 付きで実行して環境変数を設定。

```
luarocks path
```

下記で、nginx 経由でなくローカル実行。

```
resty -e 'package.path="/Users/JPZ7123/talkn-server/nginx/?.lua;" .. package.path' -e 'require("dynamic_routing")'
```

注意：
LuaJIT は Lua 5.1 の言語機能と互換性があります

MEMO

```
/usr/local/Cellar/openresty/1.25.3.1_1/nginx/logs/error.log
```

## Node

```
TOP_CONNECTION=/ npm run dev
TOP_CONNECTION=/aa.com/ npm run dev
```
