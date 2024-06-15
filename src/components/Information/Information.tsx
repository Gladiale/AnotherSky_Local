import { useHover } from "../../context/HoverContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import styles from "./Information.module.css";

const Information = () => {
  const { mediaState } = useMediaInfo();
  const { isHovered } = useHover();

  return (
    <div
      className={`${styles.information} ${
        isHovered.iconHover ? styles["Info-hovered"] : ""
      }`}
    >
      <p>{`サウンド「${mediaState.file.voiceFile[1].split(".")[0]}」`}</p>
      <p>{`立ち絵「${mediaState.folder.standFolder[0] + 1}-${
        mediaState.file.standFile[0] + 1
      }」画像「${mediaState.folder.cgFolder[0] + 1}-${
        mediaState.file.cgFile[0] + 1
      }」動画「${mediaState.folder.videoFolder[0] + 1}-${
        mediaState.file.videoFile[0] + 1
      }」エフェクト「${mediaState.folder.effectFolder[0] + 1}-${
        mediaState.file.effectFile[0] + 1
      }」`}</p>
    </div>
  );
};

export default Information;
