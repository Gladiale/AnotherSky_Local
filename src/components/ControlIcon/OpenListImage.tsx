import styles from "./OpenListImage.module.css";
import { GiNewBorn } from "react-icons/gi";
import { useScene } from "../../context/SceneContext";
import {
  type ImageListType,
  type ImageListSubType,
  useImageList,
} from "../../context/ImageListState";
import IconDefault from "../Common/IconDefault";

const OpenListImage = () => {
  const { listState, setListState, listSubState, setListSubState } = useImageList();
  const { scene, setScene } = useScene();

  const changeState = (target: keyof ImageListType) => {
    if (target === "folder") {
      setListState((prev) => ({ ...prev, [target]: !prev[target] }));
    } else {
      setListState((prev) => ({ ...prev, cg: !prev.cg, stand: !prev.stand }));
    }
  };

  const changeStateSub = (target: keyof ImageListSubType) => {
    setListSubState((prev) => ({ ...prev, [target]: !prev[target] }));
  };

  const changeScene = () => {
    if (scene != "listImg") {
      setScene("listImg");
    } else {
      // setListState((prev) => ({ ...prev, random: !prev.random }));
      setScene("cg");
    }
  };

  return (
    <div className={styles["showList-container"]}>
      <IconDefault children={<GiNewBorn />} onClick={changeScene} />
      <div className={styles["target-box"]}>
        <div className={styles.otherAction}>
          <label>
            <span>高さAuto</span>
            <input
              type="checkbox"
              checked={listSubState.heightAuto}
              onChange={() => changeStateSub("heightAuto")}
            />
          </label>
          <label>
            <span>Mode2</span>
            <input
              type="checkbox"
              checked={listSubState.mode2}
              onChange={() => changeStateSub("mode2")}
            />
          </label>
        </div>
        <div className={styles.folderCheck}>
          <label>
            <span>Folder乱数</span>
            <input
              type="checkbox"
              checked={listState.folder}
              onChange={() => changeState("folder")}
            />
          </label>
        </div>
        <div className={styles.targetSelect}>
          <label>
            <input
              type="radio"
              name="target"
              checked={listState.cg}
              onChange={() => changeState("cg")}
            />
            <span>画像</span>
          </label>
          <label>
            <input
              type="radio"
              name="target"
              checked={listState.stand}
              onChange={() => changeState("stand")}
            />
            <span>立ち絵</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default OpenListImage;
