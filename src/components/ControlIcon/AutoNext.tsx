import { useEffect, useState } from "react";
import styles from "./AutoNext.module.css";
import { GiHeartBattery } from "react-icons/gi";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import {
  useCardCharacterInfo,
  useCardCharacterState,
} from "../../context/CardCharacterContext";

const AutoNext = () => {
  // 自動画像変換
  const [isAutoMatic, setIsAutoMatic] = useState<boolean>(false);
  const [autoSpeed, setAutoSpeed] = useState<number>(450);

  const { scene } = useScene();
  const { mediaDispatch } = useMediaInfo();
  const { isCharacter } = useCardCharacterState();
  const { characterInfoDispatch } = useCardCharacterInfo();

  const handleAutoSpeed = (condition: string) => {
    switch (condition) {
      case "plus":
        setAutoSpeed((prev) => prev + 50);
        break;
      case "minus":
        setAutoSpeed((prev) => prev - 50);
        break;
      default:
        setAutoSpeed(40);
    }
  };

  useEffect(() => {
    // console.log("init");
    let intervalId: number | undefined;
    if (isAutoMatic) {
      // console.log("time start");
      intervalId = window.setInterval(() => {
        // console.log("interval running");
        isCharacter
          ? characterInfoDispatch({ type: "next" })
          : mediaDispatch({ type: "next", payload: scene });
      }, autoSpeed);
    }
    return () => {
      window.clearInterval(intervalId);
      // console.log("end");
    };
  }, [isAutoMatic, autoSpeed]);

  return (
    <div className={styles["autoMatic-box"]}>
      <GiHeartBattery
        className={`${styles.icon} ${isAutoMatic && styles.autoMatic}`}
        onClick={() => setIsAutoMatic((prev) => !prev)}
      />
      <div className={styles["autoMatic-options"]}>
        <BsDashLg
          className={styles.iconSmall}
          onClick={() => handleAutoSpeed("minus")}
        />
        <p onClick={() => handleAutoSpeed("ani")}>
          {autoSpeed === 40 ? "Anime" : autoSpeed + "ms"}
        </p>
        <BsPlusLg
          className={styles.iconSmall}
          onClick={() => handleAutoSpeed("plus")}
        />
      </div>
    </div>
  );
};

export default AutoNext;
