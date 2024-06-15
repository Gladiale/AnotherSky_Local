import styles from "./Icon.module.css";
import { BiLastPage } from "react-icons/bi";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";

const ToLast = () => {
  const { scene } = useScene();
  const { mediaDispatch } = useMediaInfo();

  const toLastFolder = (e: any) => {
    e.preventDefault();
    mediaDispatch({ type: "folderLast", payload: scene });
  };

  return (
    <BiLastPage
      className={styles.icon}
      onClick={() => mediaDispatch({ type: "last", payload: scene })}
      onContextMenu={toLastFolder}
    />
  );
};

export default ToLast;
