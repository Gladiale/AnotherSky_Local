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
  const { rotateYState } = useRotateY();
  const { mediaState } = useMediaState();

  const { triggerEditMode, changeMediaDeg, changeMediaScale, moveMediaDirect } =
    useMediaControl({ initialScale: 1, target: "effect" });

  const { handleTouchStart, handleTouchMove } = useMediaTouchControl({
    target: "effect",
  });

  const { loadStatus, showTarget, showError } = useLoading({
    trigger: [urlConfig.effect],
    target: "effect",
  });

  const [isTouched, setIsTouched] = useState<boolean>(false);
  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleTouchStart(e);
    if (mediaState.touchMode !== "closed") {
      setIsTouched(true);
    }
  };

  let imgWidth: "auto" | "100%",
    imgHeight: "auto" | "100%",
    divHeight: "auto" | "100%" | "120%";
  switch (effectState.imageEF.size) {
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
      effectState.imageEF.maxHeightFull
        ? ((imgWidth = "auto"), (imgHeight = "100%"), (divHeight = "100%"))
        : ((imgWidth = "100%"), (imgHeight = "100%"), (divHeight = "120%"));
  }

  return (
    <div
      className={`${styles["effect-box"]}
      ${effectState.imageEF.position === "top-left" && styles.topLeft}
      ${effectState.imageEF.position === "top-right" && styles.topRight}
      ${effectState.imageEF.position === "bottom-left" && styles.bottomLeft}
      ${effectState.imageEF.position === "bottom-right" && styles.bottomRight}`}
      style={{
        width: imgWidth,
        height: divHeight,
        scale: String(mediaState["effect"].scale),
        transform: `translate(${mediaState["effect"].position.x}px, ${mediaState["effect"].position.y}px)`,
        mixBlendMode: effectState.imageEF.activeBlend
          ? effectState.imageEF.blendKind
          : undefined,
      }}
    >
      <img
        className={`${styles["effect-img"]}
        ${(mediaState["effect"].isEditMode || isTouched) && styles.isEditing}`}
        src={urlConfig.effect}
        style={{
          objectFit: effectState.imageEF.size,
          width: imgWidth,
          height: imgHeight,
          transform: rotateYState.effect
            ? `rotateY(180deg) rotate(${mediaState["effect"].deg}deg)`
            : `rotate(${mediaState["effect"].deg}deg)`,
          display: loadStatus === "success" ? undefined : "none",
        }}
        onClick={changeMediaDeg}
        onMouseDown={triggerEditMode}
        onMouseMove={moveMediaDirect}
        onWheel={changeMediaScale}
        onTouchStart={touchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsTouched(false)}
        onLoad={showTarget}
        onStalled={showError}
      />

      <Loading kind="2nd" loadStatus={loadStatus} loadStyle={{ position: "absolute" }} />
    </div>
  );
};

export default EffectImage;
