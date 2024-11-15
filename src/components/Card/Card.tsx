import styles from "./Card.module.css";

import CardClip from "../CardClip/CardClip";
import CardImage from "../CardImage/CardImage";

import { useScene } from "../../context/SceneContext";
import { useHover } from "../../context/HoverContext";
import { useScreenMode } from "../../context/ScreenContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { useRotateY } from "../../context/RotateYContext";
import {
  useCardCharacterInfo,
  useCardCharacterState,
} from "../../context/CardCharacterContext";
import { useImageControl } from "../../hooks/useImageControl";
import { useAppOption } from "../../context/AppOptionContext";
import { useFilterData } from "../../hooks/useFilterData";

const Card = () => {
  // カスタムフック、インスタンス化に相当
  const {
    isEditMode,
    imageDeg,
    imageScale,
    imagePosition,
    triggerEditMode,
    changeImageDeg,
    changeImageScale,
    moveImageReverse,
  } = useImageControl({ initialScale: 1.5, isEffect: false });

  const { optionData } = useAppOption();
  const { setIsHovered } = useHover();
  const { scene, setScene } = useScene();
  const { mediaDispatch } = useMediaInfo();
  const { screenMode } = useScreenMode();
  const { rotateYState } = useRotateY();
  const { effectState } = useEffectState();
  const { filterData } = useFilterData("cg");
  const { isCharacter } = useCardCharacterState();
  const { characterInfoDispatch } = useCardCharacterInfo();

  // Cardにマウスの左クリック
  const changeScene = (e: React.MouseEvent<HTMLDivElement>) => {
    switch (scene) {
      case "card-stand":
        return setScene("card-cg");
      case "card-cg":
        changeImageDeg(e);
        break;
      default:
        return;
    }
  };

  // Cardにマウスの右クリック
  const resetScene = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    switch (scene) {
      case "card-stand":
        setScene("card-video");
        break;
      case "card-cg":
        setScene("card-stand");
        if (isEditMode || imageDeg !== 0) {
          triggerEditMode(e, true);
        }
        break;
      default:
        return;
    }
  };

  const changeImage = (e: React.WheelEvent) => {
    if (!isCharacter) {
      e.deltaY > 0
        ? mediaDispatch({ type: "next", payload: scene })
        : mediaDispatch({ type: "prev", payload: scene });
    } else {
      e.deltaY > 0
        ? characterInfoDispatch({ type: "next" })
        : characterInfoDispatch({ type: "prev" });
    }
  };

  return (
    <div className={`${styles["card-container-3d"]}`}>
      <div
        className={`${styles.card}
          ${scene === "card-cg" && styles.sceneCG}
          ${optionData.cgShadow && styles.shadow}
          ${screenMode === "cardMode" && styles.cardMode}
          ${screenMode === "cgMode" && styles.cgMode}`}
        onMouseEnter={() => setIsHovered({ cardHover: true, iconHover: false })}
        onMouseLeave={() => setIsHovered({ cardHover: false, iconHover: false })}
        onClick={changeScene}
        onContextMenu={resetScene}
        onWheel={changeImage}
        style={{
          transform: `rotate(${imageDeg}deg)
            rotateY(${rotateYState.cardRotateY ? 180 : 0}deg)`,
          overflow:
            (isEditMode && effectState.mirrorEffect) || scene === "card-stand"
              ? "hidden"
              : undefined,
          width: isEditMode && effectState.mirrorEffect ? "100%" : undefined,
          imageRendering: effectState.pixelEffect ? "pixelated" : undefined,
          filter: filterData,
          boxShadow:
            scene === "card-stand" &&
            optionData.cgShadow &&
            effectState.filterEffect.targetCard
              ? "none"
              : undefined,
        }}
      >
        <CardImage
          props={{
            isEditMode,
            imageScale,
            imagePosition,
            triggerEditMode,
            changeImageScale,
            moveImageReverse,
          }}
        />

        <CardClip scene={scene} />
      </div>
    </div>
  );
};

export default Card;
