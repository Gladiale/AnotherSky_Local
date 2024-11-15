import styles from "./AppOption.module.css";
import { useEffect, useState } from "react";
import { GiCat, GiDelighted } from "react-icons/gi";
import { useAppOption } from "../../context/AppOptionContext";
// components
import IconDefault from "../Common/IconDefault";

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
        <label onClick={() => changeOptionData("loadingAnime")}>
          <GiCat
            className={`${styles["icon"]} 
            ${optionData.loadingAnime && styles["checked"]}`}
          />
          <p>Loading動画</p>
        </label>

        <label onClick={() => changeOptionData("cgSwing")}>
          <GiCat
            className={`${styles["icon"]} 
            ${optionData.cgSwing && styles["checked"]}`}
          />
          <p>揺れの動画効果 —&gt; CG</p>
        </label>

        <label onClick={() => changeOptionData("cgShadow")}>
          <GiCat
            className={`${styles["icon"]} ${optionData.cgShadow && styles["checked"]}`}
          />
          <p>DropShadow効果 —&gt; CG </p>
        </label>

        <label onClick={() => changeOptionData("characterShadow")}>
          <GiCat
            className={`${styles["icon"]} 
            ${optionData.characterShadow && styles["checked"]}`}
          />
          <p>DropShadow効果 —&gt; 立ち絵</p>
        </label>

        <label onClick={() => changeOptionData("iconShadow")}>
          <GiCat
            className={`${styles["icon"]} 
            ${optionData.iconShadow && styles["checked"]}`}
          />
          <p>DropShadow効果 —&gt; アイコン</p>
        </label>
      </div>
    </div>
  );
};

export default AppOption;
