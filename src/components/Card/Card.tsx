import styles from "./Card.module.css";
import CardPolygon from "./CardPolygon";
import { useEffect } from "react";
import { useHover } from "../../context/HoverContext";
import { useRotateY } from "../../context/RotateYContext";
import { useScreenMode } from "../../context/ScreenContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useFilterData } from "../../hooks/useFilterData";
import { useMouseControl } from "../../hooks/useMouseControl";
// framer-motion
import { AnimatePresence, motion } from "motion/react";
import { cardImgRefresh, cardRefresh } from "../../libs/motion/motionVariants";
import CardDecoration from "./CardDecoration";

const Card = () => {
  // コンテキスト
  const { rotateYState } = useRotateY();
  const { screenMode } = useScreenMode();
  const { effectState } = useEffectState();
  const { hoverState, hoverDispatch } = useHover();
  // カスタムフック
  const { urlConfig } = useUrlConfig();
  const { filterData } = useFilterData("card");
  const { changeScene, resetScene, changeMedia } = useMouseControl("card");

  useEffect(() => {
    // 開発者modeは二回発動のため、その付けにreturnの内容も一回発動されてしまいます
    return () => hoverDispatch({ type: "special" });
  }, []);

  return (
    <motion.div
      variants={cardRefresh(rotateYState.card)}
      initial="hidden"
      animate="visible"
      className={`${styles.card} ${screenMode === "cgMode" && styles.cgMode}
        ${effectState.mirror && styles.mirror}
        ${hoverState.icon && styles.iconHover}
        ${hoverState.card && styles.cardHover}
        ${hoverState.special && styles.special}`}
      style={{
        filter: filterData,
        imageRendering:
          effectState.pixel && effectState.target.character ? "pixelated" : undefined,
      }}
      onClick={changeScene}
      onContextMenu={resetScene}
      onWheel={changeMedia}
      onTouchEnd={() => hoverDispatch({ type: "card", payload: "enter" })}
      onMouseEnter={() => hoverDispatch({ type: "card", payload: "enter" })}
      onMouseLeave={() => hoverDispatch({ type: "card", payload: "leave" })}
    >
      <CardDecoration />

      {/* キャラクター */}
      <AnimatePresence>
        <motion.img
          variants={cardImgRefresh}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={urlConfig.character}
          src={urlConfig.character}
          alt="character"
          className={styles["chara-img"]}
        />
      </AnimatePresence>

      <CardPolygon />
    </motion.div>
  );
};

export default Card;
