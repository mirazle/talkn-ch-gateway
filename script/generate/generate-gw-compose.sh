#!/bin/bash

# jqがインストールされているか確認し、無ければインストールする
sh ../install-jq.sh

# ch-config.jsonを読み込む
config_file="../../common/src/ch-config.json"
root=$(jq -r '.nginx | select(.location == "/").location' $config_file)

if [ -z "$root" ]; then
  echo "Root nginx location '/' not found in the configuration."
  exit 1
fi

# topChを読み込む
topCh=$(jq -r '.children[].nginx.location' $config_file)

# rootとtopChに対してgenerate-gw-server.shを実行
echo "Executing generate-gw-server.sh for ${root}"
sh ./generate-gw-server.sh ${root}

for ch in $topCh; do
  echo "Executing generate-gw-server.sh for ${ch}"
  sh ./generate-gw-server.sh ${ch}
done

echo "All tasks executed."
