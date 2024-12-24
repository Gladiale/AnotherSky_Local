import styles from "./Card.module.css";
import CardPolygon from "./CardPolygon";
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
// import { useEffect, useState } from "react";

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

  // const [isColorActive, setIsColorActive] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsColorActive(true);

  //   const timeOutId = setTimeout(() => {
  //     setIsColorActive(false);
  //   }, 1500);

  //   return () => clearTimeout(timeOutId);
  // }, [urlConfig.character]);

  return (
    <motion.div
      variants={cardRefresh(rotateYState.card)}
      initial="hidden"
      animate="visible"
      className={`${styles.card} ${screenMode === "cgMode" && styles.cgMode}
      ${effectState.mirror && styles.mirror}
      ${hoverState.card && styles.cardHover}`}
      style={{
        filter: filterData,
        imageRendering:
          effectState.pixel && effectState.target.character ? "pixelated" : undefined,
      }}
      onClick={changeScene}
      onContextMenu={resetScene}
      onWheel={changeMedia}
      onMouseEnter={() => hoverDispatch({ type: "card", payload: "enter" })}
      onMouseLeave={() => hoverDispatch({ type: "card", payload: "leave" })}
    >
      {/* キャラクター */}
      <AnimatePresence>
        <motion.img
          variants={cardImgRefresh}
          initial="hidden"
          animate="visible"
          key={urlConfig.character}
          src={urlConfig.character}
          alt="character"
          className={styles["stand-img"]}
        />
      </AnimatePresence>

      <CardPolygon />
    </motion.div>
  );
};

export default Card;
