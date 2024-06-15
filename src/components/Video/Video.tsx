import styles from "./Video.module.css";
import { useState } from "react";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { useFilter } from "../../context/FilterContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import { useMediaSize, useScreenMode } from "../../context/ScreenContext";
import { useRotateY } from "../../context/RotateYContext";
import EffectImage from "../EffectImage/EffectImage";

const Video = () => {
  const { setScene } = useScene();
  const { mediaState } = useMediaInfo();
  const { rotateYState } = useRotateY();
  const { screenMode } = useScreenMode();
  const { mediaSize } = useMediaSize();
  const { effectState } = useEffectState();
  const { filterState } = useFilter();

  const [rotateVideoDeg, setRotateVideoDeg] = useState<number>(0);

  const rotateVideo = () => {
    rotateVideoDeg <= -1350
      ? setRotateVideoDeg(0)
      : setRotateVideoDeg((prev) => prev - 90);
  };

  const resetScene = (e: any) => {
    e.preventDefault();
    setRotateVideoDeg(0);
    setScene("card-stand");
  };

  return (
    <div
      className={styles["video-content"]}
      onClick={rotateVideo}
      onContextMenu={resetScene}
    >
      <div
        className={`${styles["video-box"]} 
        ${screenMode === "cardMode" && styles.cardMode}
        ${screenMode === "cgMode" && styles.cgMode}`}
        style={{
          transform: `rotate(${rotateVideoDeg}deg)`,
          height: mediaSize === "contain" ? undefined : "fit-content",
        }}
      >
        <video
          loop
          autoPlay
          style={{
            transform: `rotateY(${rotateYState.videoRotateY ? 180 : 0}deg)`,
            filter: effectState.filterEffect.targetVideo
              ? `opacity(${filterState.opacity}%) brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`
              : undefined,
            objectFit: mediaSize === "custom" ? "contain" : mediaSize,
            height: mediaSize === "contain" ? "100%" : "auto",
            width: "auto",
            maxHeight: mediaSize === "custom" ? "100dvh" : undefined,
            maxWidth: mediaSize === "custom" ? "65dvw" : undefined,
          }}
          src={`/video/${mediaState.folder.videoFolder[1]}/${mediaState.file.videoFile[1]}`}
        ></video>
        {effectState.imageEF.activeImage && <EffectImage />}
      </div>
    </div>
  );
};

export default Video;
