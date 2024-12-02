import styles from "./Video.module.css";
import { useState } from "react";
import { useRotateY } from "../../context/RotateYContext";
import { useAppOption } from "../../context/AppOptionContext";
import { useMediaState } from "../../context/MediaStateContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useFilterData } from "../../hooks/useFilterData";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useMouseControl } from "../../hooks/useMouseControl";
import { useMediaControl } from "../../hooks/useMediaControl";
import { useMediaTouchControl } from "../../hooks/useMediaTouchControl";
import EffectImage from "../EffectImage/EffectImage";
import VideoControl from "./VideoControl";
import Loading from "../Loading/Loading";

const Video = () => {
  // コンテキスト
  const { rotateYState } = useRotateY();
  const { optionData } = useAppOption();
  const { mediaState } = useMediaState();
  const { effectState } = useEffectState();
  // カスタムフック
  const { urlConfig } = useUrlConfig();
  const { mediaSizeData } = useMediaSizeData();
  const { filterData } = useFilterData("video");
  const { resetScene, changeMedia } = useMouseControl("video");

  const { triggerEditMode, changeMediaDeg, changeMediaScale, moveMediaReverse } =
    useMediaControl({ initialScale: 1.5, target: "video" });

  const { handleTouchStart, handleTouchMove } = useMediaTouchControl({ target: "video" });

  const { loadStatus, showTarget, showError } = useLoading({
    trigger: [urlConfig.video],
    target: "video",
  });

  const [hasControl, setHasControl] = useState<boolean>(false);

  return (
    <div
      className={styles["video-content"]}
      onWheel={changeMedia}
      onContextMenu={(e) => {
        resetScene(e);
        triggerEditMode(e, true);
      }}
    >
      <div
        className={`${styles["video-box"]}
        ${optionData.videoShadow && styles.shadow}
        ${effectState.shakeEffect.active && styles.shake}`}
        style={{
          transform: `
          scale(${String(mediaState["video"].scale)})
          rotate(${mediaState["video"].deg}deg)
          rotateY(${rotateYState.videoRotateY ? 180 : 0}deg)
          translate(${mediaState["video"].position.x}px,
          ${mediaState["video"].position.y}px)`,
        }}
        onClick={changeMediaDeg}
        onMouseDown={triggerEditMode}
        onMouseMove={moveMediaReverse}
        onWheel={changeMediaScale}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <video
          loop
          autoPlay
          playsInline
          controls={hasControl}
          style={{
            filter: filterData,
            objectFit: mediaSizeData.objectFit,
            height: mediaSizeData.height,
            width: mediaSizeData.width,
            maxHeight: mediaSizeData.maxHeight,
            maxWidth: mediaSizeData.maxWidth,
            display: loadStatus === "success" ? undefined : "none",
          }}
          onLoadedData={showTarget}
          onStalled={showError}
          src={urlConfig.video}
        ></video>
        <Loading kind="1st" loadStatus={loadStatus} />
        {effectState.imageEF.activeImage && <EffectImage />}
      </div>

      <VideoControl setHasControl={setHasControl} />
    </div>
  );
};

export default Video;
