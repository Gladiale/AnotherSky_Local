import styles from "./CharacterParts.module.css";
import { useState } from "react";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useRotateY } from "../../context/RotateYContext";
import {
  useMediaActive,
  useMediaInfo,
} from "../../context/MediaInfoContext/MediaInfoContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { getRandomFolderFile } from "../../libs/utils/dataObjControl";
import { VoiceDataObj } from "../../data/VoiceDataObj";
import Loading from "../Loading/Loading";

type PropsType = {
  handleOverLimit: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

const CharacterParts = ({ handleOverLimit }: PropsType) => {
  const [vocal, setVocal] = useState<string>("");
  const [hasVocal, setHasVocal] = useState<boolean>(false);

  const { urlConfig } = useUrlConfig();
  const { rotateYState, rotateYDispatch } = useRotateY();
  const { effectState } = useEffectState();
  const { mediaActive } = useMediaActive();
  const { mediaInfoDispatch } = useMediaInfo();

  const { loadStatus, showTarget } = useLoading({
    trigger: [urlConfig.character],
  });

  const isMixMode =
    effectState.cgMix &&
    effectState.target.character &&
    effectState.cgMix.mixMode !== "normal";

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
      mediaInfoDispatch({ type: "next", payload: { scene: "card", mediaActive } });
    } else {
      mediaInfoDispatch({ type: "prev", payload: { scene: "card", mediaActive } });
    }
  };

  const handleLoaded = (e: React.MouseEvent<HTMLImageElement>) => {
    showTarget();
    handleOverLimit(e);
  };

  return (
    <div
      onClick={handleVocal}
      onContextMenu={(e) => {
        e.preventDefault();
        rotateYDispatch({ type: "cg", payload: { isTachie: true } });
      }}
      onWheel={changeStandImage}
      className={styles["character-box"]}
      style={{ transform: `rotateY(${rotateYState.character ? 180 : 0}deg)` }}
    >
      <img
        onLoad={handleLoaded}
        src={urlConfig.character}
        className={styles["character-img"]}
        style={{ display: loadStatus === "success" ? undefined : "none" }}
      />

      <Loading kind="3rd" loadStatus={loadStatus} />

      {isMixMode && (
        <img
          src={urlConfig.character}
          className={`${styles["character-img"]} ${styles.texture}`}
          style={{
            mixBlendMode: effectState.cgMix.mixMode,
            display: loadStatus === "success" ? undefined : "none",
          }}
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

export default CharacterParts;
