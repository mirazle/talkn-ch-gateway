#!/bin/bash

# 証明書の生成
openssl req -x509 -nodes -days 60 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -config localhost.cnf

# 証明書をシステムの信頼されたリストに追加
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localhost.crt

echo "Certificate added to the trusted list."