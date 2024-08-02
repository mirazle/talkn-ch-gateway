#!/bin/bash

# 引数でCNを受け取る。引数がなければCNを'root'に設定
CN=${1:-root}
KEY_FILE=~/talkn-certs/${CN}.key
CRT_FILE=~/talkn-certs/${CN}.crt

# 証明書の生成
openssl req -x509 -nodes -days 60 -newkey rsa:2048 -keyout "$KEY_FILE" -out "$CRT_FILE" \
  -subj "/CN=$CN" \
  -addext "subjectAltName=DNS:$CN"

# 証明書をシステムの信頼されたリストに追加
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "$CRT_FILE"

echo "Certificate added to the trusted list."