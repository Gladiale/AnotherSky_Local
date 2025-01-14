import { useHover } from "../../context/HoverContext";
import styles from "./CardDecoration.module.css";

const CardDecoration = () => {
  const { hoverState } = useHover();

  return (
    <div
      className={`${styles["decoration-box"]} 
        ${hoverState.icon && styles["iconHover"]}
        ${hoverState.card && styles["cardHover"]}`}
    >
      {/* <div className={styles["crown"]} /> */}
      <div className={styles["back-light"]} />
      <div className={styles["magic-circle"]} />
    </div>
  );
};

export default CardDecoration;
