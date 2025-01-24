import styles from "./CardDecoration.module.css";
import { useHover } from "../../context/HoverContext";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useOrnamentState } from "../../context/OrnamentContext/OrnamentContext";

const CardDecoration = () => {
  const { hoverState } = useHover();
  const { urlConfig } = useUrlConfig();
  const { ornamentState } = useOrnamentState();

  return (
    <div
      className={`${styles["decoration-box"]} 
        ${hoverState.icon && styles["iconHover"]}
        ${hoverState.card && styles["cardHover"]}`}
    >
      {/* <div className={styles["crown"]} /> */}

      {/* 後光 */}
      <div
        className={styles["back-light"]}
        style={{
          backgroundImage: hoverState.card
            ? `url(${urlConfig.ornament.backLight})`
            : undefined,
          filter: hoverState.card
            ? `drop-shadow(0 0 5px ${ornamentState.color.backLight[0]}) drop-shadow(0 0 15px ${ornamentState.color.backLight[1]})`
            : undefined,
        }}
      />

      {/* 魔法陣 */}
      <div
        className={styles["magic-circle"]}
        style={{
          backgroundImage: hoverState.card
            ? `url(${urlConfig.ornament.magicCircle2nd})`
            : `url(${urlConfig.ornament.magicCircle1st})`,
          backgroundColor: hoverState.card ? ornamentState.color.magicCircle : undefined,
          borderRadius:
            ornamentState.color.magicCircle !== "transparent" ? "50%" : undefined,
        }}
      />
    </div>
  );
};

export default CardDecoration;
