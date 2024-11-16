import styles from "./ImageParts.module.css";
import { useState } from "react";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { getRandomFolderFile } from "../../helper/dataObjControl";
import { VoiceDataObj } from "../../data/VoiceDataObj";
import Loading from "../Loading/Loading";

type PropsType = {
  handleAspect: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

const ImageParts = ({ handleAspect }: PropsType) => {
  const [vocal, setVocal] = useState<string>("");
  const [hasVocal, setHasVocal] = useState<boolean>(false);

  const { urlConfig } = useUrlConfig();
  const { effectState } = useEffectState();
  const { mediaDispatch } = useMediaInfo();

  const { loadStatus, showTarget, showError } = useLoading({
    trigger: [urlConfig.character],
    target: "character",
  });

  const handleVocal = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    // ランダムなボイスを取得
    const voiceData = getRandomFolderFile(VoiceDataObj);
    setVocal(`/voice/${voiceData.folder[1]}/${voiceData.file[1]}`);
    setHasVocal(true);
  };

  // const handleVocal = (e: React.MouseEvent<HTMLImageElement>) => {
  //   e.stopPropagation();
  //   // 特定のボイスを取得
  //   const voiceData = getRandomFile(VoiceDataObj, "sound");
  //   setVocal(`/voice/sound/${voiceData[1]}`);
  //   setHasVocal(true);
  // };

  const changeStandImage = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      mediaDispatch({ type: "next", payload: "card-stand" });
    } else {
      mediaDispatch({ type: "prev", payload: "card-stand" });
    }
  };

  const handleLoaded = (e: React.MouseEvent<HTMLImageElement>) => {
    showTarget();
    handleAspect(e);
  };

  return (
    <div className={styles["stand-box"]} onClick={handleVocal} onWheel={changeStandImage}>
      <img
        className={styles["stand-img"]}
        src={urlConfig.character}
        style={{ display: loadStatus === "success" ? undefined : "none" }}
        onLoad={handleLoaded}
        onStalled={showError}
      />

      <Loading loadStatus={loadStatus} />

      {effectState.blendCG.active && effectState.filterEffect.targetCharacter && (
        <img
          className={`${styles["stand-img"]} ${styles.texture}`}
          src={urlConfig.character}
          style={{ display: loadStatus === "success" ? undefined : "none" }}
        />
      )}

      {hasVocal && (
        <audio
          src={`${vocal}`}
          autoPlay
          onEnded={() => setHasVocal((prev) => !prev)}
        ></audio>
      )}
    </div>
  );
};

export default ImageParts;
