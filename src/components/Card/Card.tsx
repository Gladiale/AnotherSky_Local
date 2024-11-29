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
import { useAppOption } from "../../context/AppOptionContext";
import { useFilterData } from "../../hooks/useFilterData";
import { useMediaState } from "../../context/MediaStateContext";
import { useMediaControl } from "../../hooks/useMediaControl";

const Card = () => {
  // カスタムフック、インスタンス化に相当
  const { triggerEditMode, changeMediaDeg, changeMediaScale, moveMediaReverse } =
    useMediaControl({ initialScale: 1.5, target: "image" });

  const { mediaState } = useMediaState();
  const { optionData } = useAppOption();
  const { setIsHovered } = useHover();
  const { scene, setScene } = useScene();
  const { mediaInfoDispatch } = useMediaInfo();
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
      return changeMediaDeg(e);
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
      triggerEditMode(e, true);
      return;
    }
  };

  const changeImage = (e: React.WheelEvent) => {
    e.deltaY > 0
      ? mediaInfoDispatch({ type: "next", payload: scene })
      : mediaInfoDispatch({ type: "prev", payload: scene });
  };

  return (
    <div
      className={`${styles.card}
        ${screenMode === "cgMode" && styles.cgMode}
        ${scene === "card" && styles.sceneCard}
        ${(scene === "cg" || scene === "anotherCharacter") && styles.sceneCG}
        ${optionData.loadingAnime && styles.hasAnime}
        ${optionData.cgShadow && styles.shadow}`}
      onMouseEnter={() => setIsHovered({ cardHover: true, iconHover: false })}
      onMouseLeave={() => setIsHovered({ cardHover: false, iconHover: false })}
      onClick={changeScene}
      onContextMenu={resetScene}
      onWheel={changeImage}
      style={{
        transform: `rotate(${mediaState["image"].deg}deg)
            rotateY(${rotateYState.cardRotateY ? 180 : 0}deg)`,
        overflow:
          (mediaState["image"].isEditMode && effectState.mirrorEffect) || scene === "card"
            ? "hidden"
            : undefined,
        width:
          mediaState["image"].isEditMode && effectState.mirrorEffect ? "100%" : undefined,
        imageRendering: effectState.pixelEffect ? "pixelated" : undefined,
        filter: filterData,
        boxShadow:
          scene === "card" && optionData.cgShadow && effectState.filterEffect.targetCard
            ? "none"
            : undefined,
        aspectRatio: scene !== "card" ? "unset" : undefined,
      }}
    >
      <CardImage
        props={{
          triggerEditMode,
          changeMediaScale,
          moveMediaReverse,
        }}
      />

      <CardPolygon scene={scene} />
    </div>
  );
};

export default Card;
