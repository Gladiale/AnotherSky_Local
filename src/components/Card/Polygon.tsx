import styles from "./Polygon.module.css";
import { useHover } from "../../context/HoverContext";
import { type SceneType } from "../../context/SceneContext";

const Polygon = ({ scene }: { scene: SceneType }) => {
  const { isHovered } = useHover();

  return (
    <div
      className={isHovered.cardHover ? `${styles.clip} ${styles.clipHover}` : styles.clip}
      style={{ display: scene === "card-stand" ? "block" : "none" }}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Polygon;
