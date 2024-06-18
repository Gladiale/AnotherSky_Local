import { useHover } from "../../context/HoverContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import styles from "./CardImageStand.module.css";

const CardImageStand = () => {
  const { mediaState } = useMediaInfo();
  const { isHovered } = useHover();

  return (
    <div
      className={`${styles["stand-img"]} ${
        isHovered.cardHover ? styles.standHover : ""
      }`}
      style={{
        backgroundImage: `url('/character/${mediaState.folder.character[1]}/${mediaState.file.characterFile[1]}')`,
      }}
    />
  );
};

export default CardImageStand;
