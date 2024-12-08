import styles from "./CGbox.module.css";
import { useRotateY } from "../../context/RotateYContext";
import { useScreenMode } from "../../context/ScreenContext";
import { useMediaState } from "../../context/MediaStateContext";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useFilterData } from "../../hooks/useFilterData";
import { useMediaControl } from "../../hooks/useMediaControl";
import { useMouseControl } from "../../hooks/useMouseControl";
import { useMediaTouchControl } from "../../hooks/useMediaTouchControl";
// GSAP
import gsap from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import CG from "./CG";
import ControlParts from "./ControlParts";
import EffectImage from "../EffectImage/EffectImage";

const CGbox = () => {
  // コンテキスト
  const { rotateYState, rotateYDispatch } = useRotateY();
  const { screenMode } = useScreenMode();
  const { appOption } = useAppOption();
  const { mediaState } = useMediaState();
  const { effectState } = useEffectState();
  // カスタムフック
  const { filterData } = useFilterData("cg");
  const { resetScene, changeMedia } = useMouseControl("cg");
  const { handleTouchStart, handleTouchMove } = useMediaTouchControl({ target: "image" });
  const { triggerEditMode, changeMediaDeg, changeMediaScale, moveMediaReverse } =
    useMediaControl({ initialScale: 1.5, target: "image" });

  const shakeCondition = {
    low: effectState.shakeEffect.active && effectState.shakeEffect.heavy === "low",
    normal: effectState.shakeEffect.active && effectState.shakeEffect.heavy === "normal",
    high: effectState.shakeEffect.active && effectState.shakeEffect.heavy === "high",
  };

  const [isLocked, setIsLocked] = useState<boolean>(false);
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isLocked
      ? rotateYDispatch({ type: "cg", payload: {} })
      : (resetScene(e), triggerEditMode(e, true));
  };

  const cgBoxRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    gsap.to(cgBoxRef.current, {
      scale: 1,
    });
  }, []);

  return (
    <div
      ref={cgBoxRef}
      className={`${styles["cg-box"]}
      ${appOption.lastingAnime.cg && styles.swing}
      ${appOption.dropShadow.cg && styles.shadow}
      ${shakeCondition.low && styles.shakeLow}
      ${shakeCondition.normal && styles.shakeNormal}
      ${shakeCondition.high && styles.shakeHigh}
      `}
      style={{
        filter: filterData,
        imageRendering: effectState.pixelEffect ? "pixelated" : undefined,
        // width:
        //   mediaState["image"].isEditMode && effectState.mirrorEffect ? "100%" : undefined,
        overflow:
          mediaState["image"].isEditMode && effectState.mirrorEffect
            ? "hidden"
            : undefined,
      }}
      onWheel={changeMedia}
      onContextMenu={handleContextMenu}
    >
      <div
        className={styles["mix-box"]}
        style={{
          height: screenMode === "cardMode" ? "100%" : undefined,
          transform: `
          scale(${String(mediaState["image"].scale)})
          rotate(${mediaState["image"].deg}deg)
          rotateY(${rotateYState.cg ? 180 : 0}deg)
          translate(${mediaState["image"].position.x}px,
          ${mediaState["image"].position.y}px)`,
        }}
        onClick={changeMediaDeg}
        onMouseDown={triggerEditMode}
        onMouseMove={moveMediaReverse}
        onWheel={changeMediaScale}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <CG className="cg-img" />
        {effectState.blendCG.active && effectState.filterEffect.targetCard && (
          <CG className="texture-img" />
        )}
        {effectState.imageEF.activeImage && <EffectImage />}
      </div>

      <ControlParts isLocked={isLocked} setIsLocked={setIsLocked} />
    </div>
  );
};

export default CGbox;
