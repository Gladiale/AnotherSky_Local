import styles from "./ThreeBox.module.css";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
// components
import Camera3D from "./Camera3D";
import ThreeControl from "./ThreeControl";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";

const ThreeBox = () => {
  // コンテキスト
  const { appOption } = useAppOption();
  const { threeState } = useThreeState();
  const { transform3d, changeTransform3d, resetTransform3d } = useTransform3d();

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
      <div
        className={styles["three-model"]}
        style={{ transform: appOption.parallax ? transform3d : undefined }}
        onMouseMove={appOption.parallax ? changeTransform3d : undefined}
        onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
      >
        <Camera3D />
      </div>

      <ThreeControl />
    </div>
  );
};

export default ThreeBox;
