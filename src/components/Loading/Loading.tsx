import styles from "./Loading.module.css";

type LoadingProps = {
  kind: "1st" | "2nd" | "3rd" | "extra";
  loadStyle?: React.CSSProperties;
  loadStatus: "waiting" | "success" | "failed";
};

const Loading = ({ kind, loadStyle, loadStatus }: LoadingProps) => {
  return (
    <div
      className={styles["load-box"]}
      style={{
        display: loadStatus === "success" ? "none" : undefined,
        ...loadStyle,
      }}
    >
      {kind === "1st" && <div className={styles["loader-1st"]} />}
      {kind === "2nd" && <div className={styles["loader-2nd"]} />}
      {kind === "3rd" && <div className={styles["loader-3rd"]} />}
      {kind === "extra" && <div className={styles["loader-extra"]} />}
      {loadStatus === "waiting" && <p className={styles.waiting}>Loading...</p>}
      {loadStatus === "failed" && (
        <p className={styles.failed}>データの読み込みが失敗しました！</p>
      )}
    </div>
  );
};

export default Loading;
