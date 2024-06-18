import styles from "./Icon.module.css";
import { BsChevronRight } from "react-icons/bs";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";

const ToNext = () => {
  const { scene } = useScene();
  const { mediaDispatch } = useMediaInfo();

  return (
    <BsChevronRight
      className={styles.icon}
      onClick={() => mediaDispatch({ type: "next", payload: scene })}
    />
  );
};

export default ToNext;
