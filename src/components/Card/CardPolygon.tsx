import styles from "./CardPolygon.module.css";
import { useHover } from "../../context/HoverContext";
import { type SceneType } from "../../context/SceneContext";

const CardPolygon = ({ scene }: { scene: SceneType }) => {
  const { isHovered } = useHover();

  return (
    <div
      className={isHovered.cardHover ? `${styles.clip} ${styles.clipHover}` : styles.clip}
      style={{ display: scene === "card" ? "block" : "none" }}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default CardPolygon;
