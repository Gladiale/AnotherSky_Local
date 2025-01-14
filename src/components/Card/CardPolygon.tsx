import styles from "./CardPolygon.module.css";
import { useHover } from "../../context/HoverContext";
import { letterConfig } from "../../libs/config/letterConfig";

const CardPolygon = () => {
  const { hoverState } = useHover();

  return (
    <div
      className={`${styles.clip} 
        ${(hoverState.card || hoverState.icon) && styles.clipHover}`}
    >
      <span>{letterConfig.fourth}</span>
      <span>{letterConfig.first}</span>
      <span>{letterConfig.second}</span>
      <span>{letterConfig.third}</span>
    </div>
  );
};

export default CardPolygon;
