import styles from "./AppOption.module.css";
import { useEffect, useState } from "react";
import { GiDelighted, GiHollowCat } from "react-icons/gi";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
// components
import IconDefault from "../Common/IconDefault";
import CheckBox from "../Common/CheckBox";
// 画像
import icon01 from "../../assets/icon/icon-01.png";
import icon02 from "../../assets/icon/icon-02.png";

const optionConfig: {
  target: "loadingAnime" | "parallax" | "rotateYIsRightCLick";
  text: string;
}[] = [
  { target: "loadingAnime", text: "Loading動画" },
  { target: "parallax", text: "Parallax効果" },
  { target: "rotateYIsRightCLick", text: "右クリックをRotateYに変更" },
];

const AppOption = () => {
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const { appOption, appOptionDispatch, saveStorageData } = useAppOption();

  useEffect(() => {
    if (showPanel) {
      saveStorageData();
    }
  }, [appOption]);

  return (
    <div className={styles["app-option"]}>
      <div
        className={`${styles["trigger-box"]} ${
          appOption.dropShadow.icon && styles.shadow
        }`}
      >
        <IconDefault
          children={<GiDelighted />}
          onClick={() => setShowPanel((prev) => !prev)}
        />
      </div>

      <div
        className={styles["option-panel"]}
        style={{ right: showPanel ? "0" : "calc(-100dvh / 3)" }}
      >
        <div className={styles["control-box-1st"]}>
          {optionConfig.map((option, index) => (
            <label
              key={index}
              onClick={() => appOptionDispatch({ type: "basic", payload: option.target })}
            >
              <GiHollowCat
                className={`${styles["icon"]} 
            ${appOption[option.target] && styles["checked"]}`}
              />
              <p>{option.text}</p>
            </label>
          ))}
        </div>

        <div className={styles["control-box"]}>
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
        </div>

        <div className={styles["control-box"]} style={{ gap: "0.7rem" }}>
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
                  onChange: () =>
                    appOptionDispatch({ type: "dropShadow", payload: "cg" }),
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
        </div>
      </div>
    </div>
  );
};

export default AppOption;
