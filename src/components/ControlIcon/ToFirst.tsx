import styles from "./Icon.module.css";
import { BiFirstPage } from "react-icons/bi";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";

const ToFirst = () => {
  const { scene } = useScene();
  const { mediaDispatch } = useMediaInfo();

  const toFirstFolder = (e: any) => {
    e.preventDefault();
    mediaDispatch({ type: "folderFirst", payload: scene });
  };

  return (
    <BiFirstPage
      className={styles.icon}
      onClick={() => mediaDispatch({ type: "first", payload: scene })}
      onContextMenu={toFirstFolder}
    />
  );
};

export default ToFirst;
