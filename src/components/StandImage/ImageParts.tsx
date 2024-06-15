import styles from "./ImageParts.module.css";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useState } from "react";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { getRandomFolderFile } from "../../helper/dataObjControl";
import { VoiceDataObj } from "../../data/VoiceDataObj";

type PropsType = {
  handleAspect: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

const ImageParts = ({ handleAspect }: PropsType) => {
  const [vocal, setVocal] = useState<string>("");
  const [hasVocal, setHasVocal] = useState<boolean>(false);
  const { mediaState, mediaDispatch } = useMediaInfo();
  const { effectState } = useEffectState();

  const handleVocal = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    // ランダムなボイスを取得
    const voiceData = getRandomFolderFile(VoiceDataObj);
    setVocal(`/voice/${voiceData.folder[1]}/${voiceData.file[1]}`);
    setHasVocal(true);
  };

  const changeStandImage = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      mediaDispatch({ type: "next", payload: "card-stand" });
    } else {
      mediaDispatch({ type: "prev", payload: "card-stand" });
    }
  };

  return (
    <div
      className={styles["stand-box"]}
      onClick={handleVocal}
      onWheel={changeStandImage}
    >
      <img
        className={styles["stand-img"]}
        src={`/stand-image/${mediaState.folder.standFolder[1]}/${mediaState.file.standFile[1]}`}
        onLoad={handleAspect}
      />

      {effectState.blendCG.active && effectState.filterEffect.targetStand && (
        <img
          className={`${styles["stand-img"]} ${styles.texture}`}
          src={`/stand-image/${mediaState.folder.standFolder[1]}/${mediaState.file.standFile[1]}`}
          onLoad={handleAspect}
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
