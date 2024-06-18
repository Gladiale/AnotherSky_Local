import styles from "./Icon.module.css";
import { BsChevronLeft } from "react-icons/bs";
import { useScene } from "../../context/SceneContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";

const ToPrev = () => {
  const { scene } = useScene();
  const { mediaDispatch } = useMediaInfo();

  return (
    <BsChevronLeft
      className={styles.icon}
      onClick={() => mediaDispatch({ type: "prev", payload: scene })}
    />
  );
};

export default ToPrev;
