import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useRotateY } from "../../context/RotateYContext";
import styles from "./EffectImage.module.css";

const EffectImage = () => {
  const { mediaState } = useMediaInfo();
  const { effectState } = useEffectState();
  const { rotateYState } = useRotateY();

  let imgWidth: "auto" | "100%", imgHeight: "auto" | "100%";
  switch (effectState.imageEF.size) {
    case "none":
      imgWidth = "auto";
      imgHeight = "auto";
      break;
    case "cover":
      imgWidth = "100%";
      imgHeight = "100%";
      break;
    default:
      effectState.imageEF.maxHeightFull
        ? ((imgWidth = "auto"), (imgHeight = "100%"))
        : ((imgWidth = "100%"), (imgHeight = "auto"));
  }

  return (
    <img
      className={`${styles["effect-img"]}
      ${effectState.imageEF.position === "top-left" && styles.topLeft}
      ${effectState.imageEF.position === "top-right" && styles.topRight}
      ${effectState.imageEF.position === "bottom-left" && styles.bottomLeft}
      ${effectState.imageEF.position === "bottom-right" && styles.bottomRight}
      `}
      src={`/effect/${mediaState.folder.effect[1]}/${mediaState.file.effectFile[1]}`}
      style={{
        mixBlendMode: effectState.imageEF.activeBlend
          ? effectState.imageEF.blendKind
          : undefined,
        objectFit: effectState.imageEF.size,
        height: imgHeight,
        width: imgWidth,
        maxHeight: effectState.imageEF.size === "contain" ? "120%" : undefined,
        transform: rotateYState.effectRotateY ? "rotateY(180deg)" : undefined,
      }}
    />
  );
};

export default EffectImage;
