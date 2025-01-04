import styles from "./ThreeBox.module.css";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
// components
import Camera3D from "./Camera3D";

const ThreeBox = () => {
  // コンテキスト
  const { appOption } = useAppOption();
  const { threeState } = useThreeState();
  const { transform3d, changeTransform3d, resetTransform3d } = useTransform3d();

  return (
    <div
      className={styles["three-container"]}
      style={{ transform: appOption.parallax ? transform3d : undefined }}
      onWheel={(e) => e.stopPropagation()}
      onMouseMove={appOption.parallax ? changeTransform3d : undefined}
      onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
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
