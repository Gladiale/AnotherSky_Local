import styles from "./CGbox.module.css";
import { useRotateY } from "../../context/RotateYContext";
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
// components
import ControlParts from "./ControlParts";
import Transform3dBox from "./Transform3dBox";

const CGbox = () => {
  // コンテキスト
  const { appOption } = useAppOption();
  const { mediaState } = useMediaState();
  const { effectState } = useEffectState();
  const { rotateYState, rotateYDispatch } = useRotateY();
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
        <Transform3dBox />
      </div>

      <ControlParts />
    </div>
  );
};

export default CGbox;
