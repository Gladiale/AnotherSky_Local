import styles from "./Corner.module.css";

type PropsType = {
  theme: "gold" | "violet";
  singleConnerWidth: `${string}%`;
};

const Corner = ({ theme, singleConnerWidth }: PropsType) => {
  return (
    <div
      className={`${styles["corner-box"]} ${styles[theme]}`}
      style={{
        ["--single-conner-width" as any]: singleConnerWidth,
      }}
    >
      <div className={`${styles.corner} ${styles["top-left"]}`} />
      <div className={`${styles.corner} ${styles["top-right"]}`} />
      <div className={`${styles.corner} ${styles["bottom-left"]}`} />
      <div className={`${styles.corner} ${styles["bottom-right"]}`} />
    </div>
  );
};

export default Corner;
