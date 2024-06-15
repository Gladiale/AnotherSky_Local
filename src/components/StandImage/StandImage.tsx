import styles from "./StandImage.module.css";
import { useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import ImageParts from "./ImageParts";
import { useRotateY } from "../../context/RotateYContext";

type PropsType = {
  imgStyle?: React.CSSProperties;
};

const StandImage = ({ imgStyle }: PropsType) => {
  const [imgMoveValue, setImgMoveValue] = useState<string>("");

  const { rotateYState } = useRotateY();
  const { effectState } = useEffectState();
  const { filterState } = useFilter();

  const handleAspect = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const width = e.currentTarget.naturalWidth;
    const height = e.currentTarget.naturalHeight;

    const aspectRatio = width / height;
    // console.log(aspectRatio);

    if (aspectRatio < 0.29) {
      return setImgMoveValue("-9%");
    }
    if (aspectRatio < 0.39) {
      return setImgMoveValue("-15%");
    }
    if (aspectRatio < 0.4) {
      return setImgMoveValue("-18%");
    }
    if (aspectRatio < 0.5) {
      return setImgMoveValue("-20%");
    }
    if (aspectRatio < 0.54) {
      return setImgMoveValue("-29%");
    }
    if (aspectRatio < 0.58) {
      return setImgMoveValue("-30%");
    }
    return setImgMoveValue("-32%");
  };

  const filterShadow = `drop-shadow(0 0 5px #86fff3) drop-shadow(0 0 15px #fc3eff)`;
  const filterNoShadow = `opacity(${filterState.opacity}%) brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`;

  return (
    <div
      className={`${styles["stand-container"]} ${
        effectState.mirrorEffect && styles.mirror
      }`}
      style={{
        transform: effectState.mirrorEffect
          ? `translateX(${imgMoveValue})`
          : imgStyle?.transform,
      }}
    >
      <div
        className={styles["stand-wrapper"]}
        style={{
          transform: `rotateY(${rotateYState.standImgRotateY ? 180 : 0}deg)`,
          imageRendering: effectState.pixelEffect ? "pixelated" : undefined,
          filter: effectState.filterEffect.targetStand
            ? effectState.filterEffect.dropShadow
              ? filterShadow + filterNoShadow
              : filterNoShadow
            : effectState.filterEffect.dropShadow
            ? filterShadow
            : undefined,
          display:
            effectState.mirrorEffect &&
            effectState.filterEffect.targetStand &&
            filterState.opacity === 0
              ? "none"
              : undefined,
        }}
      >
        <ImageParts handleAspect={handleAspect} />
      </div>
    </div>
  );
};

export default StandImage;
