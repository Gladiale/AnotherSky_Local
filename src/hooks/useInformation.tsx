import { useEffect, useState } from "react";
import {
  useAnotherCharacter,
  useMediaInfo,
} from "../context/MediaInfoContext/MediaInfoContext";

const useInformation = () => {
  const { mediaInfo } = useMediaInfo();
  const { anotherActive } = useAnotherCharacter();
  const [infoActive, setInfoActive] = useState<boolean>(false);

  const infoData = {
    voice: `サウンド「${mediaInfo.file.voice[1].split(".")[0]}」`,
    cg: `画像「${mediaInfo.file.cg[0] + 1}/${mediaInfo.file.cg[2]}」`,
    character: `立ち絵「${mediaInfo.file.character[0] + 1}/${
      mediaInfo.file.character[2]
    }」`,
    anotherCharacter: `キャラ「${mediaInfo.file.anotherCharacter[0] + 1}/${
      mediaInfo.file.anotherCharacter[2]
    }」`,
    video: `動画「${mediaInfo.file.video[0] + 1}/${mediaInfo.file.video[2]}」`,
    effect: `エフェクト「${mediaInfo.file.effect[0] + 1}/${mediaInfo.file.effect[2]}」`,
  };

  // 初期値をfalseで満たすオブジェクトを作成
  const initInfoState = Object.keys(infoData).reduce((acc, key) => {
    acc[key as keyof typeof infoData] = false;
    return acc;
  }, {} as Record<keyof typeof infoData, boolean>);

  const [infoState, setInfoState] = useState<typeof initInfoState>(initInfoState);

  const handleActiveStateChange = (key: keyof typeof infoData) => {
    setInfoActive(true);
    setInfoState((prevState) => ({ ...prevState, [key]: true }));
    const timeoutId = setTimeout(() => {
      setInfoActive(false);
      setInfoState((prevState) => ({ ...prevState, [key]: false }));
    }, 1500);
    return timeoutId;
  };

  useEffect(() => {
    const timeoutId = handleActiveStateChange("cg");
    return () => clearTimeout(timeoutId);
  }, [infoData.cg]);

  useEffect(() => {
    const timeoutId = handleActiveStateChange("character");
    return () => clearTimeout(timeoutId);
  }, [infoData.character]);

  useEffect(() => {
    const timeoutId = handleActiveStateChange("voice");
    return () => clearTimeout(timeoutId);
  }, [infoData.voice]);

  useEffect(() => {
    const timeoutId = handleActiveStateChange("video");
    return () => clearTimeout(timeoutId);
  }, [infoData.video]);

  useEffect(() => {
    const timeoutId = handleActiveStateChange("effect");
    return () => clearTimeout(timeoutId);
  }, [infoData.effect]);

  useEffect(() => {
    let timeoutId: number;
    if (anotherActive) {
      timeoutId = handleActiveStateChange("anotherCharacter");
    }
    return () => clearTimeout(timeoutId);
  }, [infoData.anotherCharacter]);

  return { infoData, infoActive, infoState };
};

export { useInformation };
