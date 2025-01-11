import styles from "./EffectImage.module.css";
import { useState } from "react";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useRotateY } from "../../context/RotateYContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useMediaControl } from "../../hooks/useMediaControl";
import { useMediaState } from "../../context/MediaStateContext";
import { useMediaTouchControl } from "../../hooks/useMediaTouchControl";
import Loading from "../Loading/Loading";

const EffectImage = () => {
  const { urlConfig } = useUrlConfig();
  const { effectState } = useEffectState();
  const { rotateYState, rotateYDispatch } = useRotateY();
  const { mediaState } = useMediaState();

  const { triggerEditMode, changeMediaDeg, changeMediaScale, moveMediaDirect } =
    useMediaControl({ initialScale: 1, target: "effect" });

  const { handleTouchStart, handleTouchMove } = useMediaTouchControl({
    target: "effect",
  });

  const { loadStatus, showTarget } = useLoading({
    trigger: [urlConfig.effect],
  });

  const [isTouched, setIsTouched] = useState<boolean>(false);
  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleTouchStart(e);
    if (mediaState.touchMode !== "closed") {
      setIsTouched(true);
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    if (mediaState.effect.isEditMode) {
      e.preventDefault();
      e.stopPropagation();
      rotateYDispatch({ type: "cg", payload: { isEffect: true } });
    }
  };

  let imgWidth: "auto" | "100%",
    imgHeight: "auto" | "100%",
    divHeight: "auto" | "100%" | "120%";
  switch (effectState.image.size) {
    case "none":
      imgWidth = "auto";
      imgHeight = "auto";
      divHeight = "auto";
      break;
    case "cover":
      imgWidth = "100%";
      imgHeight = "100%";
      divHeight = "100%";
      break;
    default:
      effectState.image.maxHeightFull
        ? ((imgWidth = "auto"), (imgHeight = "100%"), (divHeight = "100%"))
        : ((imgWidth = "100%"), (imgHeight = "100%"), (divHeight = "120%"));
  }

  return (
    <div
      className={styles["effect-box"]}
      style={{
        width: imgWidth,
        height: divHeight,
        mixBlendMode: effectState.image.mixMode,
        transform: `
        scale(${String(mediaState["effect"].scale)})
        translate(${mediaState["effect"].position.x}px,
        ${mediaState["effect"].position.y}px)`,
      }}
    >
      <img
        className={`${styles["effect-img"]}
        ${(mediaState["effect"].isEditMode || isTouched) && styles.isEditing}`}
        src={urlConfig.effect}
        style={{
          objectFit: effectState.image.size,
          width: imgWidth,
          height: imgHeight,
          transform: `rotate(${mediaState["effect"].deg}deg)
          rotateY(${rotateYState.effect ? 180 : 0}deg)`,
          display: loadStatus === "success" ? undefined : "none",
        }}
        onClick={changeMediaDeg}
        onWheel={changeMediaScale}
        onMouseDown={triggerEditMode}
        onMouseMove={moveMediaDirect}
        onContextMenu={handleContextMenu}
        onTouchStart={touchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsTouched(false)}
        onLoad={showTarget}
      />

      <Loading kind="2nd" loadStatus={loadStatus} loadStyle={{ position: "absolute" }} />
    </div>
  );
};

export default EffectImage;
