import styles from "./ThreeBox.module.css";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
// components
import Camera3D from "./Camera3D";

const ThreeBox = () => {
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
      <Camera3D />
    </div>
  );
};

export default ThreeBox;
