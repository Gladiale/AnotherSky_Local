import styles from "./Icon.module.css";
import { BsChevronLeft } from "react-icons/bs";
import { useScene } from "../../context/SceneContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";

const ToPrev = () => {
  const { scene } = useScene();
  const { mediaDispatch } = useMediaInfo();

  const toPrevFolder = (e: any) => {
    e.preventDefault();
    mediaDispatch({ type: "folderPrev", payload: scene });
  };

  return (
    <BsChevronLeft
      className={styles.icon}
      onClick={() => mediaDispatch({ type: "prev", payload: scene })}
      onContextMenu={toPrevFolder}
    />
  );
};

export default ToPrev;
