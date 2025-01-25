import styles from "./AppOptionContent.module.css";
import { GiAzulFlake } from "react-icons/gi";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
// framer-motion
import { motion } from "motion/react";
import { fadeInUpSpring } from "../../libs/motion/motionVariants";
// components
import CheckBox from "../Common/CheckBox";
// 画像
import icon01 from "../../assets/panel/icon-01.png";
import icon02 from "../../assets/panel/icon-02.png";

const optionConfig: {
  target: "loadingAnime" | "parallax" | "rotateYIsRightCLick";
  text: string;
}[] = [
  { target: "loadingAnime", text: "Loading動画" },
  { target: "parallax", text: "Parallax効果" },
  { target: "rotateYIsRightCLick", text: "右ClickをY軸回転" },
];

const AppOptionContent1st = () => {
  const { appOption, appOptionDispatch } = useAppOption();

  return (
    <>
      <motion.div
        variants={fadeInUpSpring(0, 0.4)}
        initial="hidden"
        animate="visible"
        className={styles["control-box-type-1st"]}
      >
        {optionConfig.map((option, index) => (
          <label
            key={index}
            className={styles["option-label"]}
            onClick={() => appOptionDispatch({ type: "basic", payload: option.target })}
          >
            <GiAzulFlake
              className={`${styles["icon"]} 
                ${appOption[option.target] && styles["checked"]}`}
            />
            <p>{option.text}</p>
          </label>
        ))}
      </motion.div>

      <motion.div
        variants={fadeInUpSpring(0.2, 0.4)}
        initial="hidden"
        animate="visible"
        className={styles["control-box-type-2nd"]}
      >
        <div className={styles["item-left"]}>
          <img src={icon01} alt="icon" />
        </div>
        <div className={styles["item-right"]}>
          <CheckBox
            kind="2nd"
            fontSize={1}
            checkBoxSize={0.8}
            gap={{ outerGap: "0.7rem", innerGap: "0.1rem" }}
            checkBoxList={[
              {
                text: "CG",
                state: appOption.lastingAnime.cg,
                onChange: () =>
                  appOptionDispatch({ type: "lastingAnime", payload: "cg" }),
              },
              {
                text: "VIDEO",
                state: appOption.lastingAnime.video,
                onChange: () =>
                  appOptionDispatch({ type: "lastingAnime", payload: "video" }),
              },
            ]}
          />
          <p>常時動画効果</p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUpSpring(0.4, 0.4)}
        initial="hidden"
        animate="visible"
        className={styles["control-box-type-2nd"]}
        style={{ gap: "0.7rem" }}
      >
        <div className={styles["item-left"]}>
          <img src={icon02} alt="icon" />
        </div>
        <div className={styles["item-right"]}>
          <CheckBox
            kind="2nd"
            fontSize={1}
            checkBoxSize={0.8}
            gap={{ outerGap: "0.7rem", innerGap: "0.1rem" }}
            checkBoxList={[
              {
                text: "CG",
                state: appOption.dropShadow.cg,
                onChange: () => appOptionDispatch({ type: "dropShadow", payload: "cg" }),
              },
              {
                text: "VIDEO",
                state: appOption.dropShadow.video,
                onChange: () =>
                  appOptionDispatch({ type: "dropShadow", payload: "video" }),
              },
            ]}
          />
          <CheckBox
            kind="2nd"
            fontSize={1}
            checkBoxSize={0.8}
            gap={{ outerGap: "0.7rem", innerGap: "0.1rem" }}
            checkBoxList={[
              {
                text: "ICON",
                state: appOption.dropShadow.icon,
                onChange: () =>
                  appOptionDispatch({ type: "dropShadow", payload: "icon" }),
              },
              {
                text: "CHARA",
                state: appOption.dropShadow.character,
                onChange: () =>
                  appOptionDispatch({ type: "dropShadow", payload: "character" }),
              },
            ]}
          />
          <p style={{ marginTop: "0.2rem" }}>ドロップシャドウ</p>
        </div>
      </motion.div>
    </>
  );
};

export default AppOptionContent1st;
