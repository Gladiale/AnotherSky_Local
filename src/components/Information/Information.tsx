import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useHover } from "../../context/HoverContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import styles from "./Information.module.css";

const Information = () => {
  const { isHovered } = useHover();
  const { scene } = useScene();
  const { effectState } = useEffectState();
  const { mediaState } = useMediaInfo();

  const infoConfig = {
    voice: `サウンド「${mediaState.file.voiceFile[1].split(".")[0]}」`,
    character: `立ち絵「${mediaState.folder.character[0] + 1}-${
      mediaState.file.characterFile[0] + 1
    }」`,
    cg: `画像「${mediaState.folder.cg[0] + 1}-${mediaState.file.cgFile[0] + 1}」`,
    video: `動画「${mediaState.folder.video[0] + 1}-${
      mediaState.file.videoFile[0] + 1
    }」`,
    effect: `エフェクト「${mediaState.folder.effect[0] + 1}-${
      mediaState.file.effectFile[0] + 1
    }」`,
  };

  return (
    <div
      className={`${styles.information} ${
        isHovered.iconHover ? styles["Info-hovered"] : ""
      }`}
    >
      <p>{infoConfig.voice}</p>
      <p>
        <span className={scene === "card" ? styles.active : ""}>
          {infoConfig.character}
        </span>
        <span
          className={
            scene === "cg" && !effectState.imageEF.activeImage ? styles.active : ""
          }
        >
          {infoConfig.cg}
        </span>
        <span
          className={
            scene === "video" && !effectState.imageEF.activeImage ? styles.active : ""
          }
        >
          {infoConfig.video}
        </span>
        <span
          className={
            effectState.imageEF.activeImage && scene !== "card" ? styles.active : ""
          }
        >
          {infoConfig.effect}
        </span>
      </p>
    </div>
  );
};

export default Information;
