import styles from "./Card.module.css";

import CardPolygon from "./CardPolygon";
import CardImage from "../CardImage/CardImage";

import { useScene } from "../../context/SceneContext";
import { useHover } from "../../context/HoverContext";
import { useScreenMode } from "../../context/ScreenContext";
import {
  useAnotherCharacter,
  useMediaInfo,
} from "../../context/MediaInfoContext/MediaInfoContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useRotateY } from "../../context/RotateYContext";
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
  const { anotherActive } = useAnotherCharacter();
  const { screenMode } = useScreenMode();
  const { rotateYState } = useRotateY();
  const { effectState } = useEffectState();
  const { filterData } = useFilterData("cg");

  // Cardにマウスの左クリック
  const changeScene = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scene === "card") {
      if (anotherActive) {
        return setScene("anotherCharacter");
      }
      return setScene("cg");
    }
    if (scene === "cg" || scene === "anotherCharacter") {
      return changeImageDeg(e);
    }
  };

  // Cardにマウスの右クリック
  const resetScene = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (scene === "card") {
      return setScene("video");
    }
    if (scene === "cg" || scene === "anotherCharacter") {
      setScene("card");
      if (isEditMode || imageDeg !== 0) {
        triggerEditMode(e, true);
      }
      return;
    }
  };

  const changeImage = (e: React.WheelEvent) => {
    e.deltaY > 0
      ? mediaDispatch({ type: "next", payload: scene })
      : mediaDispatch({ type: "prev", payload: scene });
  };

  return (
    <div className={`${styles["card-container-3d"]}`}>
      <div
        className={`${styles.card}
          ${(scene === "cg" || scene === "anotherCharacter") && styles.sceneCG}
          ${scene === "card" && styles.sceneCard}
          ${optionData.cgShadow && styles.shadow}
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
            (isEditMode && effectState.mirrorEffect) || scene === "card"
              ? "hidden"
              : undefined,
          width: isEditMode && effectState.mirrorEffect ? "100%" : undefined,
          imageRendering: effectState.pixelEffect ? "pixelated" : undefined,
          filter: filterData,
          boxShadow:
            scene === "card" && optionData.cgShadow && effectState.filterEffect.targetCard
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

        <CardPolygon scene={scene} />
      </div>
    </div>
  );
};

export default Card;
