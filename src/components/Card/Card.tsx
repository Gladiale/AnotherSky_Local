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
import { motion } from "motion/react";
import { bgRefresh, cardRefresh } from "../../libs/motion/motionVariants";
// import { useEffect, useState } from "react";

const Card = () => {
  // コンテキスト
  const { rotateYState } = useRotateY();
  const { screenMode } = useScreenMode();
  const { effectState } = useEffectState();
  const { isHovered, setIsHovered } = useHover();
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
      variants={cardRefresh(rotateYState.cardRotateY)}
      initial="hidden"
      animate="visible"
      className={`${styles.card} ${screenMode === "cgMode" && styles.cgMode}`}
      style={{
        filter: filterData,
        imageRendering: effectState.pixelEffect ? "pixelated" : undefined,
      }}
      onClick={changeScene}
      onContextMenu={resetScene}
      onWheel={changeMedia}
      onMouseEnter={() => setIsHovered({ cardHover: true, iconHover: false })}
      onMouseLeave={() => setIsHovered({ cardHover: false, iconHover: false })}
    >
      {/* 背景画像 */}
      <motion.div
        variants={bgRefresh}
        initial="hidden"
        animate="visible"
        className={styles["stand-img"]}
        style={{
          height: isHovered.cardHover ? "100%" : "0",
          backgroundImage: `url(${urlConfig.character})`,
        }}
      />

      <CardPolygon />
    </motion.div>
  );
};

export default Card;
