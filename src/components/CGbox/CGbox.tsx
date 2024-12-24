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
import { useRef } from "react";
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
    low: effectState.shake.active && effectState.shake.heavy === "low",
    normal: effectState.shake.active && effectState.shake.heavy === "normal",
    high: effectState.shake.active && effectState.shake.heavy === "high",
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    appOption.rotateYIsRightCLick
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
        imageRendering:
          effectState.pixel && effectState.target.cg ? "pixelated" : undefined,
        // width:
        //   mediaState["image"].isEditMode && effectState.mirror ? "100%" : undefined,
        overflow:
          mediaState["image"].isEditMode && effectState.mirror ? "hidden" : undefined,
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
        {effectState.cgMix.active && effectState.target.cg && (
          <CG className="texture-img" mixBlendMode={effectState.cgMix.mixMode} />
        )}
        {effectState.image.active && <EffectImage />}
      </div>

      <ControlParts />
    </div>
  );
};

export default CGbox;
