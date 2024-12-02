import styles from "./CardPolygon.module.css";
import { useHover } from "../../context/HoverContext";

const CardPolygon = () => {
  const { isHovered } = useHover();

  return (
    <div
      className={isHovered.cardHover ? `${styles.clip} ${styles.clipHover}` : styles.clip}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default CardPolygon;
