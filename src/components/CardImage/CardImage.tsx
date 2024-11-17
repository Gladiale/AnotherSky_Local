import styles from "./CardImage.module.css";
import { useScene } from "../../context/SceneContext";
import { useHover } from "../../context/HoverContext";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useRotateY } from "../../context/RotateYContext";
import { useMediaState } from "../../context/MediaStateContext";
import CGbox from "../CGbox/CGbox";

type PropsType = {
  triggerEditMode: (e: React.MouseEvent<HTMLDivElement>, reset?: boolean) => void;
  changeMediaScale: (e: React.WheelEvent) => void;
  moveMediaReverse: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const CardImage = ({ props }: { props: PropsType }) => {
  const { triggerEditMode, changeMediaScale, moveMediaReverse } = props;

  const { mediaState } = useMediaState();
  const { scene } = useScene();
  const { isHovered } = useHover();
  const { urlConfig } = useUrlConfig();
  const { rotateYState } = useRotateY();

  return (
    <div
      className={styles["cg-wrapper"]}
      style={{
        scale: String(mediaState["image"].scale),
        transform: `
        translate(${mediaState["image"].position.x}px,
        ${mediaState["image"].position.y}px) 
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
            changeMediaScale,
            moveMediaReverse,
          }}
        />
      )}
    </div>
  );
};

export default CardImage;
