import styles from "./ThreeBox.module.css";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
// components
import Camera3D from "./Camera3D";
import Corner from "../Common/Corner";
import Loading from "../Loading/Loading";

const ThreeBox = ({ isTransitionEnd }: { isTransitionEnd: boolean }) => {
  // コンテキスト
  const { threeState } = useThreeState();

  return (
    <div
      className={styles["three-container"]}
      onWheel={(e) => e.stopPropagation()}
      onClick={(e) => {
        !threeState.active.rotate && e.stopPropagation();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {isTransitionEnd ? (
        <Camera3D />
      ) : (
        <Loading kind="1st" loadStatus="waiting" loadStyle={{ position: "absolute" }} />
      )}

      <Corner theme="gold" singleConnerWidth="15%" />
    </div>
  );
};

export default ThreeBox;
