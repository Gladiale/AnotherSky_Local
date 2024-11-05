import styles from "./EffectImage.module.css";
import { useState } from "react";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useRotateY } from "../../context/RotateYContext";
import { useImageControl } from "../../hooks/useImageControl";

const EffectImage = () => {
  const { mediaState } = useMediaInfo();
  const { effectState } = useEffectState();
  const { rotateYState } = useRotateY();
  const [imageDeg, setImageDeg] = useState<number>(0);

  const {
    isEditMode,
    triggerEditMode,
    imageScale,
    changeImageScale,
    imagePosition,
    moveImageDirect,
  } = useImageControl({ initialScale: 1, isEffect: true });

  const changeImageDeg = (e: React.MouseEvent<HTMLImageElement>) => {
    if (isEditMode) {
      e.stopPropagation();
      if (imageDeg <= -1350) {
        setImageDeg(0);
      } else {
        setImageDeg((prev) => prev - 90);
      }
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
        // maxHeight: effectState.imageEF.size === "contain" ? "120%" : undefined,
        scale: String(imageScale),
        transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
        mixBlendMode: effectState.imageEF.activeBlend
          ? effectState.imageEF.blendKind
          : undefined,
      }}
    >
      <img
        className={`${styles["effect-img"]} ${isEditMode ? styles.isEditing : ""}`}
        src={`/effect/${mediaState.folder.effect[1]}/${mediaState.file.effectFile[1]}`}
        style={{
          objectFit: effectState.imageEF.size,
          width: imgWidth,
          height: imgHeight,
          transform: rotateYState.effectRotateY
            ? `rotateY(180deg) rotate(${imageDeg}deg)`
            : `rotate(${imageDeg}deg)`,
        }}
        onClick={changeImageDeg}
        onMouseDown={triggerEditMode}
        onMouseMove={moveImageDirect}
        onWheel={changeImageScale}
      />
    </div>
  );
};

export default EffectImage;
