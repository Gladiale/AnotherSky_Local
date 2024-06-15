import styles from "./ScreenControl.module.css";
import { GiSnowflake2 } from "react-icons/gi";
import { useMediaSize, useScreenMode } from "../../context/ScreenContext";

const ScreenControl = () => {
  const { screenMode, setScreenMode } = useScreenMode();
  const { mediaSize, setMediaSize } = useMediaSize();

  const screenControl = () => {
    switch (screenMode) {
      case "cardMode":
        setScreenMode("cgMode");
        break;
      default:
        setScreenMode("cardMode");
    }
  };

  return (
    <div className={styles["screen-container"]}>
      <div className={styles.sizeSelect}>
        <label>
          <input
            type="radio"
            name="size"
            checked={mediaSize === "contain"}
            onChange={() => setMediaSize("contain")}
          />
          <span>contain</span>
        </label>
        <label>
          <input
            type="radio"
            name="size"
            checked={mediaSize === "none"}
            onChange={() => setMediaSize("none")}
          />
          <span>origin</span>
        </label>
        <label>
          <input
            type="radio"
            name="size"
            checked={mediaSize === "custom"}
            onChange={() => setMediaSize("custom")}
          />
          <span>custom</span>
        </label>
      </div>
      <GiSnowflake2 className={styles.icon} onClick={screenControl} />
    </div>
  );
};

export default ScreenControl;
