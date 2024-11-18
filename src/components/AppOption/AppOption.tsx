import styles from "./AppOption.module.css";
import { useEffect, useState } from "react";
import { GiDelighted, GiHollowCat } from "react-icons/gi";
import { useAppOption } from "../../context/AppOptionContext";
import type { AppOptionDataType } from "../../types";
// components
import IconDefault from "../Common/IconDefault";

const optionConfig: { target: keyof AppOptionDataType; text: string }[] = [
  { target: "loadingAnime", text: "Loading動画" },
  { target: "cgSwing", text: "揺れの動画効果 —> CG" },
  { target: "cgShadow", text: "DropShadow効果 —> CG" },
  { target: "videoShadow", text: "DropShadow効果 —> 動画" },
  { target: "characterShadow", text: "DropShadow効果 —> 立ち絵" },
  { target: "iconShadow", text: "DropShadow効果 —> アイコン" },
];

const AppOption = () => {
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const { optionData, saveStorageData, changeOptionData } = useAppOption();

  useEffect(() => {
    if (showPanel) {
      saveStorageData();
    }
  }, [optionData]);

  return (
    <div className={styles["app-option"]}>
      <div
        className={`${styles["trigger-box"]} ${optionData.iconShadow && styles.shadow}`}
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
        {optionConfig.map((option, index) => (
          <label key={index} onClick={() => changeOptionData(option.target)}>
            <GiHollowCat
              className={`${styles["icon"]} 
            ${optionData[option.target] && styles["checked"]}`}
            />
            <p>{option.text}</p>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AppOption;
