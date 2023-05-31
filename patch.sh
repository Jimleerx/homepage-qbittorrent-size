#!/bin/sh
wget -O /app/public/locales/zh-CN/common.json https://cdn.jsdelivr.net/gh/Jimleerx/homepage-qbittorrent-size@master/common.json
wget -O /app/src/widgets/qbittorrent/component.jsx https://cdn.jsdelivr.net/gh/Jimleerx/homepage-qbittorrent-size@master/component.jsx
wget -O /app/.next.zip https://cdn.jsdelivr.net/gh/Jimleerx/homepage-qbittorrent-size@master/next.zip
mv /app/.next /app/.next.old
unzip -d /app /app/.next.zip 
chown -R node:node /app/.next
chmod 644 `find /app/.next -type f`
chmod 755 `find /app/.next -type d`
