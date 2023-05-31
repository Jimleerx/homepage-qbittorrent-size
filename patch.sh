#!/bin/sh
wget -O /app/public/locales/zh-CN/common.json https://github.com/Jimleerx/homepage-qbittorrent-size/raw/main/common.json
wget -O /app/src/widgets/qbittorrent/component.jsx https://github.com/Jimleerx/homepage-qbittorrent-size/raw/main/component.jsx
wget -O /app/.next.zip https://github.com/Jimleerx/homepage-qbittorrent-size/raw/main/next.zip
mv /app/.next /app/.next.old
unzip -d /app /app/.next.zip 
chown -R node:node /app/.next
chmod 644 `find /app/.next -type f`
chmod 755 `find /app/.next -type d`
