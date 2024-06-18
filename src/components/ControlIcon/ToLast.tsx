import styles from "./Icon.module.css";
import { BiLastPage } from "react-icons/bi";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";

const ToLast = () => {
  const { scene } = useScene();
  const { mediaDispatch } = useMediaInfo();

  return (
    <BiLastPage
      className={styles.icon}
      onClick={() => mediaDispatch({ type: "last", payload: scene })}
    />
  );
};

export default ToLast;
