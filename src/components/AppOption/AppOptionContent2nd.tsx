import styles from "./AppOptionContent.module.css";
import { useState } from "react";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useClickPosition } from "../../hooks/useClickPosition";
import {
  useOrnamentInfo,
  useOrnamentState,
} from "../../context/OrnamentContext/OrnamentContext";
import { type OrnamentInfoType } from "../../context/OrnamentContext/ornamentInit";
// framer-motion
import { motion } from "motion/react";
import { fadeInUpSpring } from "../../libs/motion/motionVariants";
// components
import Loading from "../Loading/Loading";
import RadioBox from "../Common/RadioBox";
import PartsBox3rd from "../Common/PartsBox3rd";
import SwatchesPicker from "../SwatchesPicker/SwatchesPicker";

const AppOptionContent2nd = () => {
  const { urlConfig } = useUrlConfig();
  const { clickPosition, handleClickPosition } = useClickPosition();
  const { ornamentInfo, ornamentInfoDispatch } = useOrnamentInfo();
  const { ornamentState, ornamentStateDispatch } = useOrnamentState();

  const [hasColorPicker, setHasColorPicker] = useState<boolean>(false);
  const [picTarget, setPicTarget] = useState<keyof OrnamentInfoType>("backLight");

  const { loadStatus, showTarget } = useLoading({
    trigger: [
      ornamentInfo.backLight[1],
      ornamentInfo.magicCircle1st[1],
      ornamentInfo.magicCircle2nd[1],
    ],
  });

  const colorTarget = picTarget === "backLight" ? "backLight" : "magicCircle";

  const handleColorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (colorTarget === "backLight") {
      handleClickPosition(e);
    }
    setHasColorPicker(true);
  };

  return (
    <>
      <motion.div
        variants={fadeInUpSpring(0, 0.4)}
        initial="hidden"
        animate="visible"
        className={`${styles["control-box-type-1st"]} ${styles.decoration}`}
      >
        <p style={{ color: "#ff84fb", fontSize: "1.1rem" }}>カード設置</p>
      </motion.div>

      <motion.div
        variants={fadeInUpSpring(0.2, 0.4)}
        initial="hidden"
        animate="visible"
        className={styles["control-box-type-2nd"]}
      >
        <div className={styles["mix-box"]}>
          <RadioBox
            radioName="ornament"
            radioList={[
              {
                text: "魔法陣1st",
                state: picTarget === "magicCircle1st",
                onChange: () => setPicTarget("magicCircle1st"),
              },
              {
                text: "後光",
                state: picTarget === "backLight",
                onChange: () => setPicTarget("backLight"),
              },
              {
                text: "魔法陣2nd",
                state: picTarget === "magicCircle2nd",
                onChange: () => setPicTarget("magicCircle2nd"),
              },
            ]}
          />
          <PartsBox3rd
            message={ornamentInfo[picTarget][1]}
            onPrevClick={() => ornamentInfoDispatch({ type: "prev", payload: picTarget })}
            onNextClick={() => ornamentInfoDispatch({ type: "next", payload: picTarget })}
            onFirstClick={() =>
              ornamentInfoDispatch({ type: "first", payload: picTarget })
            }
            onLastClick={() => ornamentInfoDispatch({ type: "last", payload: picTarget })}
            onCenterClick={() =>
              ornamentInfoDispatch({ type: "default", payload: picTarget })
            }
            onBoxClick={() =>
              ornamentInfoDispatch({ type: "random", payload: picTarget })
            }
          />
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUpSpring(0.4, 0.4)}
        initial="hidden"
        animate="visible"
        className={styles["control-box-type-2nd"]}
      >
        <div className={styles["color-box"]}>
          <button
            type="button"
            className={styles["reset-button"]}
            onClick={() =>
              ornamentStateDispatch({ type: "resetColor", payload: colorTarget })
            }
          >
            Reset
          </button>
          <div
            className={styles["color-label"]}
            style={{
              backgroundImage:
                colorTarget === "magicCircle"
                  ? `linear-gradient(to right, ${ornamentState.color.magicCircle} 50%, ${ornamentState.color.magicCircle} 50%)`
                  : `linear-gradient(to right, ${ornamentState.color.backLight[0]} 50%, ${ornamentState.color.backLight[1]} 50%)`,
            }}
            onClick={handleColorClick}
          >
            <img
              alt="魔法陣2nd"
              src={urlConfig.ornament[picTarget]}
              style={{
                opacity: loadStatus === "success" ? 1 : 0,
              }}
              onLoad={showTarget}
            />
            {hasColorPicker && (
              <SwatchesPicker
                target={colorTarget}
                clickPosition={clickPosition}
                closePicker={() => setHasColorPicker(false)}
              />
            )}
            <Loading
              kind="1st"
              loadStatus={loadStatus}
              loadStyle={{ aspectRatio: "1/1", gap: 0, position: "absolute" }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AppOptionContent2nd;
