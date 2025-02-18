import styles from "./TouchPage.module.css";
import { useTouchNext } from "../../hooks/useTouchNext";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useRotateY } from "../../context/RotateYContext";
import { useDirection } from "../../context/OtherContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useMediaActive } from "../../context/MediaInfoContext/MediaInfoContext";
// framer-motion
import { motion, AnimatePresence } from "motion/react";
import { touchPageMotion } from "../../libs/motion/motionVariants";

const TouchPage = () => {
  // カスタムフック
  const { urlConfig } = useUrlConfig();
  const { mediaSizeData } = useMediaSizeData();
  const { handleTouchStart, handleTouchEnd } = useTouchNext("cg");
  // コンテキスト
  const { isNext } = useDirection();
  const { effectState } = useEffectState();
  const { mediaActive } = useMediaActive();
  const { rotateYState, rotateYDispatch } = useRotateY();

  const imgUrl = mediaActive.anotherCharacter ? urlConfig.anotherCharacter : urlConfig.cg;
  const changeElementRotate = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    rotateYDispatch({ type: "cg", payload: {} });
  };

  return (
    <>
      <div className={styles["empty"]} />

      <AnimatePresence>
        <motion.div
          variants={touchPageMotion(isNext)}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={imgUrl}
          className={styles["touch-box"]}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onContextMenu={changeElementRotate}
        >
          <div
            className={styles["item-box"]}
            style={{ transform: `rotateY(${rotateYState.cg ? 180 : 0}deg)` }}
          >
            <img
              alt="画像"
              src={imgUrl}
              className={styles["element"]}
              style={{
                width: mediaSizeData.width,
                height: mediaSizeData.height,
                maxWidth: mediaSizeData.maxWidth,
                maxHeight: mediaSizeData.maxHeight,
                objectFit: mediaSizeData.objectFit,
              }}
            />

            {effectState.cgMix.active && effectState.target.cg && (
              <img
                alt="画像"
                src={imgUrl}
                className={`${styles["element"]} ${styles["texture"]}`}
                style={{
                  mixBlendMode: effectState.cgMix.mixMode,
                  width: mediaSizeData.width,
                  height: mediaSizeData.height,
                  maxWidth: mediaSizeData.maxWidth,
                  maxHeight: mediaSizeData.maxHeight,
                  objectFit: mediaSizeData.objectFit,
                }}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default TouchPage;
