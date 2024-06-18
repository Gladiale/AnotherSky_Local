import styles from "./CardImage.module.css";
import { useState } from "react";
import { useRotateY } from "../../context/RotateYContext";
import { type SceneType } from "../../context/SceneContext";
import CardImageCG from "../CardImageCG/CardImageCG";
import CardImageStand from "../CardImageStand/CardImageStand";

type PropsType = {
  scene: SceneType;
  isPictureMode: boolean;
  setIsPictureMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardImage = (props: PropsType) => {
  const { scene, isPictureMode, setIsPictureMode } = props;

  const [pictureScale, setPictureScale] = useState<number>(1.5);
  const [picturePosition, setPicturePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const { rotateYState } = useRotateY();

  return (
    <div
      className={styles["cg-wrapper"]}
      style={{
        scale: isPictureMode ? String(pictureScale) : "1",
        transform: `translate(${picturePosition.x}px, ${picturePosition.y}px)
                    rotateY(${rotateYState.cgRotateY ? 180 : 0}deg)`,
      }}
    >
      {scene === "card-stand" ? (
        <CardImageStand />
      ) : (
        <CardImageCG
          data={{
            isPictureMode,
            setIsPictureMode,
            pictureScale,
            setPictureScale,
            picturePosition,
            setPicturePosition,
          }}
        />
      )}
    </div>
  );
};

export default CardImage;
