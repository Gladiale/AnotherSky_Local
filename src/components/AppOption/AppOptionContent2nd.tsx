import styles from "./AppOptionContent.module.css";
import { useState } from "react";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import {
  useOrnamentInfo,
  useOrnamentState,
} from "../../context/OrnamentContext/OrnamentContext";
import { type OrnamentInfoType } from "../../context/OrnamentContext/ornamentInit";
import { useLoading } from "../../hooks/useLoading";
import { useClickPosition } from "../../hooks/useClickPosition";
// framer-motion
import { motion } from "motion/react";
import { fadeInUpSpring } from "../../libs/motion/motionVariants";
// components
import Loading from "../Loading/Loading";
import RadioBox from "../Common/RadioBox";
import PartsBox3rd from "../Common/PartsBox3rd";

const AppOptionContent2nd = () => {
  const { urlConfig } = useUrlConfig();
  const { clickPosition, handleClickPosition } = useClickPosition();
  const { ornamentInfo, ornamentInfoDispatch } = useOrnamentInfo();
  const { ornamentState, ornamentStateDispatch } = useOrnamentState();
  const [picTarget, setPicTarget] = useState<keyof OrnamentInfoType>("backLight");

  const { loadStatus, showTarget } = useLoading({
    trigger: [
      ornamentInfo.backLight[1],
      ornamentInfo.magicCircle1st[1],
      ornamentInfo.magicCircle2nd[1],
    ],
  });

  const colorTarget = picTarget === "backLight" ? "backLight" : "magicCircle";
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (colorTarget === "backLight") {
      let value: [string, string];
      if (clickPosition === "left") {
        value = [e.target.value, ornamentState["color"]["backLight"][1]];
      } else {
        value = [ornamentState["color"]["backLight"][0], e.target.value];
      }

      return setTimeout(() => {
        ornamentStateDispatch({
          type: "changeColor",
          payload: {
            target: colorTarget,
            value: value,
          },
        });
      }, 200);
    }

    setTimeout(() => {
      ornamentStateDispatch({
        type: "changeColor",
        payload: {
          target: colorTarget,
          value: e.target.value,
        },
      });
    }, 200);
  };

  const handleColorClick = (e: React.MouseEvent<HTMLInputElement>) => {
    let value: string;
    if (colorTarget === "backLight") {
      if (clickPosition === "left") {
        value = ornamentState.color.backLight[0];
      } else {
        value = ornamentState.color.backLight[1];
      }
    } else {
      value =
        ornamentState.color.magicCircle === "transparent"
          ? "#000000"
          : ornamentState.color.magicCircle;
    }
    e.currentTarget.value = value;
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
        <div style={{ width: "100%" }}>
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
            className={styles["reset-button"]}
            onClick={() =>
              ornamentStateDispatch({ type: "resetColor", payload: colorTarget })
            }
          >
            Reset
          </button>
          <label
            className={styles["color-label"]}
            style={{
              backgroundImage:
                colorTarget === "magicCircle"
                  ? `linear-gradient(to right, ${ornamentState.color.magicCircle} 50%, ${ornamentState.color.magicCircle} 50%)`
                  : `linear-gradient(to right, ${ornamentState.color.backLight[0]} 50%, ${ornamentState.color.backLight[1]} 50%)`,
            }}
            onClick={colorTarget === "backLight" ? handleClickPosition : undefined}
          >
            <img
              alt="魔法陣2nd"
              src={urlConfig.ornament[picTarget]}
              style={{
                opacity: loadStatus === "success" ? 1 : 0,
              }}
              onLoad={showTarget}
            />
            <input type="color" onClick={handleColorClick} onChange={handleColorChange} />
            <Loading
              kind="1st"
              loadStatus={loadStatus}
              loadStyle={{ aspectRatio: "1/1", gap: 0, position: "absolute" }}
            />
          </label>
        </div>
      </motion.div>
    </>
  );
};

export default AppOptionContent2nd;
