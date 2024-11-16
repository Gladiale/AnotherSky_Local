import styles from "./Video.module.css";
import { useState } from "react";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useFilter } from "../../context/FilterContext";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useScene } from "../../context/SceneContext";
import { useRotateY } from "../../context/RotateYContext";
import { useAppOption } from "../../context/AppOptionContext";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import EffectImage from "../EffectImage/EffectImage";
import VideoControl from "./VideoControl/VideoControl";
import Loading from "../Loading/Loading";

const Video = () => {
  const { setScene } = useScene();
  const { urlConfig } = useUrlConfig();
  const { rotateYState } = useRotateY();
  const { effectState } = useEffectState();
  const { filterState } = useFilter();
  const { optionData } = useAppOption();
  const { mediaSizeData } = useMediaSizeData();

  const { loadStatus, showTarget, showError } = useLoading({
    trigger: [urlConfig.video],
    target: "video",
  });

  const [rotateVideoDeg, setRotateVideoDeg] = useState<number>(0);
  const [videoHovered, setVideoHovered] = useState<boolean>(false);
  const [hasControl, setHasControl] = useState<boolean>(false);

  const rotateVideo = () => {
    rotateVideoDeg <= -1350
      ? setRotateVideoDeg(0)
      : setRotateVideoDeg((prev) => prev - 90);
  };

  const resetScene = (e: any) => {
    e.preventDefault();
    setRotateVideoDeg(0);
    setScene("card");
  };

  return (
    <div
      className={styles["video-content"]}
      onClick={rotateVideo}
      onContextMenu={resetScene}
      onMouseEnter={() => setVideoHovered(true)}
      onMouseLeave={() => setVideoHovered(false)}
    >
      <div
        className={`${styles["video-box"]}
        ${optionData.videoShadow && styles.shadow}
        ${effectState.shakeEffect.active && styles.shake}`}
        style={{
          transform: `rotate(${rotateVideoDeg}deg) 
                      rotateY(${rotateYState.videoRotateY ? 180 : 0}deg)`,
        }}
      >
        <video
          loop
          autoPlay
          playsInline
          controls={hasControl}
          style={{
            filter: effectState.filterEffect.targetVideo
              ? `opacity(${filterState.opacity}%) brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`
              : undefined,
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

        <Loading loadStatus={loadStatus} />

        {effectState.imageEF.activeImage && <EffectImage />}

        <VideoControl videoHovered={videoHovered} setHasControl={setHasControl} />
      </div>
    </div>
  );
};

export default Video;
