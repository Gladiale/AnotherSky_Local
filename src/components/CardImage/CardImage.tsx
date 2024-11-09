import styles from "./CardImage.module.css";
import { useRotateY } from "../../context/RotateYContext";
import { useScene } from "../../context/SceneContext";
import CardImageCG from "../CardImageCG/CardImageCG";
import CardImageStand from "../CardImageStand/CardImageStand";

type PropsType = {
  isEditMode: boolean;
  imageScale: number;
  imagePosition: {
    x: number;
    y: number;
  };
  triggerEditMode: (e: React.MouseEvent<HTMLDivElement>, reset?: boolean) => void;
  changeImageScale: (e: React.WheelEvent) => void;
  moveImageReverse: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const CardImage = ({ props }: { props: PropsType }) => {
  const {
    isEditMode,
    imageScale,
    imagePosition,
    triggerEditMode,
    changeImageScale,
    moveImageReverse,
  } = props;

  const { rotateYState } = useRotateY();
  const { scene } = useScene();

  return (
    <div
      className={styles["cg-wrapper"]}
      style={{
        scale: isEditMode ? String(imageScale) : "1",
        transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)
                    rotateY(${rotateYState.cgRotateY ? 180 : 0}deg)`,
      }}
    >
      {scene === "card-stand" ? (
        <CardImageStand />
      ) : (
        <CardImageCG
          data={{
            triggerEditMode,
            changeImageScale,
            moveImageReverse,
          }}
        />
      )}
    </div>
  );
};

export default CardImage;
