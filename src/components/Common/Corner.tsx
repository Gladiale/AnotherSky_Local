import styles from "./Corner.module.css";

type PropsType = {
  theme: "gold" | "violet";
  singleConnerWidth: `${string}%`;
};

const Corner = ({ theme, singleConnerWidth }: PropsType) => {
  return (
    <div
      className={`${styles["conner-box"]} ${styles[theme]}`}
      style={{
        ["--single-conner-width" as any]: singleConnerWidth,
      }}
    >
      <div className={`${styles.conner} ${styles["top-left"]}`} />
      <div className={`${styles.conner} ${styles["top-right"]}`} />
      <div className={`${styles.conner} ${styles["bottom-left"]}`} />
      <div className={`${styles.conner} ${styles["bottom-right"]}`} />
    </div>
  );
};

export default Corner;
