import styles from "./Loading.module.css";

const Loading = ({ loadStatus }: { loadStatus: "wait" | "success" | "failed" }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ display: loadStatus === "success" ? "none" : undefined }}
    >
      <div className={styles.loader} />
      {loadStatus === "failed" && (
        <p className={styles.failed}>データの読み込みが失敗しました！</p>
      )}
    </div>
  );
};

export default Loading;
