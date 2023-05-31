# homepage-qbittorrent-size
#### 修改qbittorrent widget显示上传速度、下载速度、做种数量、做种体积
#### 修改字体为 海派腔调森系圆
![Preview](https://ghproxy.com/https://github.com/Jimleerx/homepage-qbittorrent-size/blob/main/Preview.png)

## 使用方法
```
wget https://ghproxy.com/https://github.com/Jimleerx/homepage-qbittorrent-size/raw/main/patch.sh | sh
```

#### /src/widgets/qbittorrent/component.jsx
```
import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();

  const { widget } = service;

  const { data: torrentData, error: torrentError } = useWidgetAPI(widget, "torrents/info");

  if (torrentError) {
    return <Container service={service} error={torrentError} />;
  }

  if (!torrentData) {
    return (
      <Container service={service}>
-       <Block label="qbittorrent.leech" />
        <Block label="qbittorrent.download" />
-       <Block label="qbittorrent.seed" />
        <Block label="qbittorrent.upload" />
+       <Block label="qbittorrent.seed" />
+       <Block label="qbittorrent.size" />
      </Container>
    );
  }

  let rateDl = 0;
  let rateUl = 0;
  let completed = 0;
+    let size = 0;

  for (let i = 0; i < torrentData.length; i += 1) {
    const torrent = torrentData[i];
    rateDl += torrent.dlspeed;
    rateUl += torrent.upspeed;
+   size += torrent.size;
    if (torrent.progress === 1) {
      completed += 1;
    }
  }

- const leech = torrentData.length - completed;

  return (
    <Container service={service}>
-     <Block label="qbittorrent.leech" value={t("common.number", { value: leech })} />
      <Block label="qbittorrent.download" value={t("common.bibyterate", { value: rateDl, decimals: 1 })} />
-     <Block label="qbittorrent.seed" value={t("common.number", { value: completed })} />
      <Block label="qbittorrent.upload" value={t("common.bibyterate", { value: rateUl, decimals: 1 })} />
+     <Block label="qbittorrent.seed" value={t("common.number", { value: completed })} />
+     <Block label="qbittorrent.size" value={t("common.bbytes", { value: size, maximumFractionDigits: 1 })} />
    </Container>
  );
}

```

#### /public/locales/zh-CN/common.json
```
184    "qbittorrent": {
185        "download": "下载",
186        "upload": "上传",
187        "leech": "下载中",
188        "seed": "做种",
+ 199      "size": "体积"
```
