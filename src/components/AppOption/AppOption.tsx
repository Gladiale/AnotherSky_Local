import styles from "./AppOption.module.css";
import { useEffect, useState } from "react";
import { useHover } from "../../context/HoverContext";
import { GiDelighted, GiForwardField } from "react-icons/gi";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
// components
import Corner from "../Common/Corner";
import IconDefault from "../Common/IconDefault";
import AppOptionContent1st from "./AppOptionContent1st";
import AppOptionContent2nd from "./AppOptionContent2nd";

const AppOption = () => {
  const { hoverDispatch } = useHover();
  const { appOption, saveStorageData } = useAppOption();
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [isContent2nd, setIsContent2nd] = useState<boolean>(false);

  useEffect(() => {
    if (showPanel) {
      saveStorageData();
      hoverDispatch({ type: "card", payload: "enter" });
    } else {
      hoverDispatch({ type: "card", payload: "leave" });
    }
  }, [showPanel]);

  return (
    <div className={styles["app-option"]}>
      <div
        className={`${styles["trigger-button"]} 
        ${appOption.dropShadow.icon && styles.shadow}`}
      >
        <IconDefault
          children={<GiDelighted />}
          onClick={() => setShowPanel((prev) => !prev)}
        />
      </div>

      <div
        className={styles["panel-box"]}
        style={{ right: showPanel ? "0" : "calc(-100dvh / 3)" }}
      >
        <Corner theme="violet" singleConnerWidth="40%" />

        <div
          className={`${styles["content-switch-button"]} 
          ${appOption.dropShadow.icon && styles.shadow}`}
        >
          <IconDefault
            children={<GiForwardField />}
            onClick={() => setIsContent2nd((prev) => !prev)}
          />
        </div>

        {isContent2nd ? <AppOptionContent2nd /> : <AppOptionContent1st />}
      </div>
    </div>
  );
};

export default AppOption;
