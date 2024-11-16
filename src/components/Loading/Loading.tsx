import styles from "./Loading.module.css";

type LoadingProps = {
  loadStatus: "wait" | "success" | "failed";
};

const Loading = ({ loadStatus }: LoadingProps) => {
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
