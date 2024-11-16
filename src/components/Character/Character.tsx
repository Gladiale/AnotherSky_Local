import styles from "./Character.module.css";
import { useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useRotateY } from "../../context/RotateYContext";
import { useFilterData } from "../../hooks/useFilterData";
import CharacterParts from "./CharacterParts";

type PropsType = {
  imgStyle?: React.CSSProperties;
};

const Character = ({ imgStyle }: PropsType) => {
  const [imgMoveValue, setImgMoveValue] = useState<string>("");

  const { rotateYState } = useRotateY();
  const { effectState } = useEffectState();
  const { filterState } = useFilter();
  const { filterData } = useFilterData("character");

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
          filter: filterData,
          display:
            effectState.mirrorEffect &&
            effectState.filterEffect.targetCharacter &&
            filterState.opacity === 0
              ? "none"
              : undefined,
        }}
      >
        <CharacterParts handleAspect={handleAspect} />
      </div>
    </div>
  );
};

export default Character;
