import styles from "./Loading.module.css";

type LoadingProps = {
  loadStatus: "waiting" | "success" | "failed";
  loadStyle?: React.CSSProperties;
};

const Loading = ({ loadStatus, loadStyle }: LoadingProps) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        display: loadStatus === "success" ? "none" : undefined,
        position: loadStyle?.position,
      }}
    >
      <div className={styles.loader} />
      {loadStatus === "waiting" && <p className={styles.waiting}>Loading...</p>}
      {loadStatus === "failed" && (
        <p className={styles.failed}>データの読み込みが失敗しました！</p>
      )}
    </div>
  );
};

export default Loading;
