import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useRotateY } from "../../context/RotateYContext";
import styles from "./EffectImage.module.css";

const EffectImage = () => {
  const { mediaState } = useMediaInfo();
  const { effectState } = useEffectState();
  const { rotateYState } = useRotateY();

  return (
    <img
      className={`${styles["effect-img"]}
      ${effectState.imageEF.position === "top-left" && styles.topLeft}
      ${effectState.imageEF.position === "top-right" && styles.topRight}
      ${effectState.imageEF.position === "bottom-left" && styles.bottomLeft}
      ${effectState.imageEF.position === "bottom-right" && styles.bottomRight}
      `}
      src={`/effect-image/${mediaState.folder.effectFolder[1]}/${mediaState.file.effectFile[1]}`}
      style={{
        mixBlendMode: effectState.imageEF.activeBlend
          ? effectState.imageEF.blendKind
          : undefined,
        objectFit: effectState.imageEF.size,
        height: effectState.imageEF.size === "cover" ? "100%" : undefined,
        width: effectState.imageEF.size === "none" ? "auto" : undefined,
        transform: rotateYState.effectRotateY ? "rotateY(180deg)" : undefined,
      }}
    />
  );
};

export default EffectImage;
