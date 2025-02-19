import { useContentWidth } from "../../context/OtherContext";
import styles from "./Loading.module.css";

type LoadingProps = {
  kind: "main" | "eff" | "chara" | "extra";
  loadStyle?: React.CSSProperties;
  loadStatus: "waiting" | "success" | "failed";
};

const Loading = ({ kind, loadStyle, loadStatus }: LoadingProps) => {
  const { contentWidth } = useContentWidth();

  let width: number | undefined;
  switch (kind) {
    case "main":
      width = contentWidth.main === 0 ? undefined : contentWidth.main;
      break;
    case "chara":
      width = contentWidth.chara === 0 ? undefined : contentWidth.chara;
      break;
    default:
      width = undefined;
  }

  return (
    <div
      className={styles["load-box"]}
      style={{
        width: width,
        display: loadStatus === "success" ? "none" : undefined,
        ...loadStyle,
      }}
    >
      {kind === "main" && <div className={styles["loader-1st"]} />}
      {kind === "eff" && <div className={styles["loader-2nd"]} />}
      {kind === "chara" && <div className={styles["loader-3rd"]} />}
      {kind === "extra" && <div className={styles["loader-1st"]} />}
      {loadStatus === "waiting" && <p className={styles.waiting}>Loading...</p>}
      {loadStatus === "failed" && (
        <p className={styles.failed}>データの読み込みが失敗しました！</p>
      )}
    </div>
  );
};

export default Loading;
