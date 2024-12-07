import styles from "./CardPolygon.module.css";
import { useHover } from "../../context/HoverContext";

const CardPolygon = () => {
  const { hoverState } = useHover();

  return (
    <div className={hoverState.card ? `${styles.clip} ${styles.clipHover}` : styles.clip}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default CardPolygon;
