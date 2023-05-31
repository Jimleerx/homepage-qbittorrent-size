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
        <Block label="qbittorrent.download" />
        <Block label="qbittorrent.upload" />
        <Block label="qbittorrent.seed" />
        <Block label="qbittorrent.size" />
      </Container>
    );
  }

  let rateDl = 0;
  let rateUl = 0;
  let completed = 0;
  let size = 0;

  for (let i = 0; i < torrentData.length; i += 1) {
    const torrent = torrentData[i];
    rateDl += torrent.dlspeed;
    rateUl += torrent.upspeed;
    size += torrent.size;
    if (torrent.progress === 1) {
      completed += 1;
    }
  }

  // const leech = torrentData.length - completed;

  return (
    <Container service={service}>
      <Block label="qbittorrent.download" value={t("common.bibyterate", { value: rateDl, decimals: 1 })} />
      <Block label="qbittorrent.upload" value={t("common.bibyterate", { value: rateUl, decimals: 1 })} />
      <Block label="qbittorrent.seed" value={t("common.number", { value: completed })} />
      <Block label="qbittorrent.size" value={t("common.bbytes", { value: size, maximumFractionDigits: 1 })} />
    </Container>
  );
}
