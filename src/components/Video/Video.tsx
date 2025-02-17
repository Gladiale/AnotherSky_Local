import styles from "./Video.module.css";
import { useState } from "react";
import { useRotateY } from "../../context/RotateYContext";
import { useMediaState } from "../../context/MediaStateContext";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useFilterData } from "../../hooks/useFilterData";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useMouseControl } from "../../hooks/useMouseControl";
import { useMediaControl } from "../../hooks/useMediaControl";
import { useContentChange } from "../../hooks/useCharaOffsetX";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useMediaTouchControl } from "../../hooks/useMediaTouchControl";
import EffectImage from "../EffectImage/EffectImage";
import VideoControl from "./VideoControl";
import Loading from "../Loading/Loading";

const Video = () => {
  // コンテキスト
  const { rotateYState, rotateYDispatch } = useRotateY();
  const { appOption } = useAppOption();
  const { mediaState } = useMediaState();
  const { effectState } = useEffectState();
  // カスタムフック
  const { urlConfig } = useUrlConfig();
  const { mediaSizeData } = useMediaSizeData();
  const { filterData } = useFilterData("video");
  const { resetScene, changeMedia } = useMouseControl("video");
  const { transform3d, changeTransform3d, resetTransform3d } = useTransform3d();

  const { triggerEditMode, changeMediaDeg, changeMediaScale, moveMediaReverse } =
    useMediaControl({ initialScale: 1.5, target: "video" });
  const { handleTouchStart, handleTouchMove } = useMediaTouchControl({ target: "video" });

  const { loadStatus, showTarget } = useLoading({
    trigger: [urlConfig.video],
  });
  const { targetRef, setLoadedTrue } = useContentChange(loadStatus, "videoEl", "main");

  const [hasControl, setHasControl] = useState<boolean>(false);
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    appOption.rotateYIsRightCLick
      ? rotateYDispatch({ type: "video", payload: {} })
      : (resetScene(e), triggerEditMode(e, true));
  };

  return (
    <div
      className={styles["video-content"]}
      onWheel={changeMedia}
      onContextMenu={handleContextMenu}
    >
      <div
        className={`${styles["video-box"]}
        ${appOption.dropShadow.video && styles.shadow}
        ${appOption.lastingAnime.video && styles.shake}`}
        style={{
          filter: filterData,
          transform: `
          scale(${String(mediaState["video"].scale)})
          rotate(${mediaState["video"].deg}deg)
          rotateY(${rotateYState.video ? 180 : 0}deg)
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
            objectFit: mediaSizeData.objectFit,
            height: mediaSizeData.height,
            width: mediaSizeData.width,
            maxHeight: mediaSizeData.maxHeight,
            maxWidth: mediaSizeData.maxWidth,
            display: loadStatus === "success" ? undefined : "none",
            transform: appOption.parallax ? transform3d : undefined,
          }}
          ref={targetRef as React.MutableRefObject<HTMLVideoElement>}
          onLoadedData={() => (showTarget(), setLoadedTrue())}
          onMouseMove={appOption.parallax ? changeTransform3d : undefined}
          onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
          src={urlConfig.video}
        ></video>
        <Loading kind="1st" loadStatus={loadStatus} />
        {effectState.image.active && <EffectImage />}
      </div>

      <VideoControl setHasControl={setHasControl} />
    </div>
  );
};

export default Video;
