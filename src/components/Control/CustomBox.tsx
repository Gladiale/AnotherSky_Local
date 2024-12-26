import styles from "./CustomBox.module.css";
import { useScene } from "../../context/SceneContext";
import ToHome from "../ControlIcon/ToHome";
import ShowFlipBook from "../ControlIcon/ShowFlipBook";

type PropsType = {
  className: "desk" | "mobile";
  style: React.CSSProperties | undefined;
};

const CustomBox = ({ className, style }: PropsType) => {
  const { scene } = useScene();

  return (
    (scene === "cg" || scene === "video") && (
      <div style={style} className={`${styles["custom-box"]} ${styles[className]}`}>
        {/* 違うシーンに応じて中身変更 */}
        <ShowFlipBook />
        <ToHome />
      </div>
    )
  );
};

export default CustomBox;
