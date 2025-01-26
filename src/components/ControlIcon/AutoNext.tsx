import styles from "./AutoNext.module.css";
import { useEffect, useState } from "react";
import { GiHeartBattery } from "react-icons/gi";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import { useScene } from "../../context/SceneContext";
import {
  useMediaActive,
  useMediaInfo,
} from "../../context/MediaInfoContext/MediaInfoContext";
import IconSmall from "../Common/IconSmall";
import IconDefault from "../Common/IconDefault";

const AutoNext = () => {
  // 自動画像変換
  const [isAutoMatic, setIsAutoMatic] = useState<boolean>(false);
  const [isAutoEff, setIsAutoEff] = useState<boolean>(false);
  const [autoSpeed, setAutoSpeed] = useState<number>(450);

  const { scene } = useScene();
  const { mediaActive } = useMediaActive();
  const { mediaInfoDispatch } = useMediaInfo();

  const handleAutoSpeed = (condition: string) => {
    switch (condition) {
      case "plus":
        setAutoSpeed((prev) => prev + 15);
        break;
      case "minus":
        setAutoSpeed((prev) => prev - 15);
        break;
      default:
        switch (autoSpeed) {
          case 40:
            return setAutoSpeed(475);
          case 475:
            return setAutoSpeed(950);
          default:
            setAutoSpeed(40);
        }
    }
  };

  const handleAutoMatic = () => {
    if (isAutoMatic) {
      setIsAutoEff(false);
    }
    setIsAutoMatic((prev) => !prev);
  };

  const handleAutoEff = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAutoEff((prev) => !prev);
  };

  useEffect(() => {
    // console.log("init");
    let intervalId: number | undefined;
    if (isAutoMatic) {
      // console.log("time start");
      intervalId = window.setInterval(() => {
        // console.log("interval running");
        mediaInfoDispatch({ type: "next", payload: { scene, mediaActive } });
      }, autoSpeed);
    }
    return () => {
      window.clearInterval(intervalId);
      // console.log("end");
    };
  }, [isAutoMatic, autoSpeed]);

  useEffect(() => {
    let intervalId: number | undefined;
    if (isAutoEff) {
      intervalId = window.setInterval(() => {
        mediaInfoDispatch({ type: "effectNext" });
      }, autoSpeed);
    }
    return () => {
      window.clearInterval(intervalId);
    };
  }, [isAutoEff, autoSpeed]);

  return (
    <div className={styles["autoMatic-box"]}>
      <IconDefault onClick={handleAutoMatic} onContextMenu={handleAutoEff}>
        <GiHeartBattery
          className={`
            ${isAutoMatic && styles.autoMatic}
            ${isAutoEff && styles.autoMaticEff}`}
        />
      </IconDefault>

      <div className={styles["autoMatic-options"]}>
        <IconSmall
          shape="circle"
          children={<BsDashLg />}
          onClick={() => handleAutoSpeed("minus")}
        />
        <p onClick={() => handleAutoSpeed("ani")}>
          {autoSpeed === 40 ? "Anime" : autoSpeed + "ms"}
        </p>
        <IconSmall
          shape="circle"
          children={<BsPlusLg />}
          onClick={() => handleAutoSpeed("plus")}
        />
      </div>
    </div>
  );
};

export default AutoNext;
