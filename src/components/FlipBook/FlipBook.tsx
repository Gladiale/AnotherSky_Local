import styles from "./FlipBook.module.css";
import { useState } from "react";
import { useUrlList } from "../../hooks/useUrlList";
import { useFilterData } from "../../hooks/useFilterData";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import FlipLayer from "./FlipLayer";
import FlipControl from "./FlipControl";
import EffectImage from "../EffectImage/EffectImage";
// framer-motion
import { motion } from "motion/react";
import { flipBookRefresh } from "../../libs/motion/motionVariants";

const FlipBook = () => {
  // コンテキスト
  const { appOption } = useAppOption();
  const { effectState } = useEffectState();
  // カスタムフック
  const { filterData } = useFilterData("cg");
  const { urlList, firstLastInfo, target } = useUrlList();

  const [isReversing, setIsReversing] = useState<Boolean>(false);
  const [layerState, setLayerState] = useState<{
    active: "1st" | "2nd";
    page: "first" | "last" | undefined;
  }>({
    active: "1st",
    page: undefined,
  });

  return (
    <motion.div
      variants={flipBookRefresh}
      initial="hidden"
      animate="visible"
      className={`${styles["flip-book"]} ${appOption.dropShadow.cg && styles.shadow}`}
      style={{
        filter: filterData,
        imageRendering:
          effectState.pixel && effectState.target.cg ? "pixelated" : undefined,
      }}
    >
      {layerState.active === "1st" && (
        <FlipLayer
          isReversing={isReversing}
          target={target}
          urlList={urlList}
          layerState={layerState}
          setLayerState={setLayerState}
          firstLastInfo={firstLastInfo}
        />
      )}

      {layerState.active === "2nd" && (
        <FlipLayer
          isReversing={isReversing}
          target={target}
          urlList={urlList}
          layerState={layerState}
          setLayerState={setLayerState}
          firstLastInfo={firstLastInfo}
        />
      )}

      {effectState.image.active && <EffectImage />}

      <FlipControl setIsReversing={setIsReversing} />
    </motion.div>
  );
};

export default FlipBook;
