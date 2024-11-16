import { useHover } from "../../context/HoverContext";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import styles from "./CardImageStand.module.css";

const CardImageStand = () => {
  const { urlConfig } = useUrlConfig();
  const { isHovered } = useHover();

  return (
    <div
      className={`${styles["stand-img"]} ${isHovered.cardHover ? styles.standHover : ""}`}
      style={{
        backgroundImage: `url(${urlConfig.character})`,
      }}
    />
  );
};

export default CardImageStand;
