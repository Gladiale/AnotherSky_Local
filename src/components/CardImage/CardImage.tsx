import styles from "./CardImage.module.css";
import { useScene } from "../../context/SceneContext";
import { useHover } from "../../context/HoverContext";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useRotateY } from "../../context/RotateYContext";
import CGbox from "../CGbox/CGbox";

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

  const { scene } = useScene();
  const { isHovered } = useHover();
  const { urlConfig } = useUrlConfig();
  const { rotateYState } = useRotateY();

  return (
    <div
      className={styles["cg-wrapper"]}
      style={{
        scale: isEditMode ? String(imageScale) : "1",
        transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)
                    rotateY(${rotateYState.cgRotateY ? 180 : 0}deg)`,
      }}
    >
      {scene === "card" ? (
        <div
          className={`${styles["stand-img"]} ${isHovered.cardHover && styles.standHover}`}
          style={{
            backgroundImage: `url(${urlConfig.character})`,
          }}
        />
      ) : (
        <CGbox
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
