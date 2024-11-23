import styles from "./ShowDirectory.module.css";
import { useState } from "react";
import { GiCorset } from "react-icons/gi";
import {
  type DirectoryTargetType,
  type SceneType,
  useDirectoryInfo,
  useScene,
} from "../../context/SceneContext";
import IconDefault from "../Common/IconDefault";
import RadioBox from "../Common/RadioBox";

const ShowDirectory = () => {
  const { scene, setScene } = useScene();
  const { directoryTarget, setDirectoryTarget, setPageIndex } = useDirectoryInfo();

  const [beforeScene, setBeforeScene] = useState<SceneType | null>(null);

  const changeScene = () => {
    if (scene != "directoryMode") {
      setBeforeScene(scene);
      setScene("directoryMode");
    } else {
      beforeScene && setScene(beforeScene);
    }
  };

  const changeTarget = (target: DirectoryTargetType) => {
    setPageIndex(0);
    setDirectoryTarget(target);
  };

  return (
    <div className={styles["icon-container"]}>
      <div className={styles.wrapper}>
        <RadioBox
          responsive={true}
          radioName="directory"
          radioSpanList={["画像", "立ち絵", "動画"]}
          radioCheckList={[
            directoryTarget === "cg",
            directoryTarget === "character",
            directoryTarget === "video",
          ]}
          radioChangeFuncList={[
            () => changeTarget("cg"),
            () => changeTarget("character"),
            () => changeTarget("video"),
          ]}
        />
      </div>
      <IconDefault children={<GiCorset />} onClick={changeScene} />
    </div>
  );
};

export default ShowDirectory;
