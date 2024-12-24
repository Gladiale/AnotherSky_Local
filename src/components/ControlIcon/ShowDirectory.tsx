import styles from "./ShowDirectory.module.css";
import { useState } from "react";
import { GiAtom } from "react-icons/gi";
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
          radioList={[
            {
              text: "画像",
              state: directoryTarget === "cg",
              onChange: () => changeTarget("cg"),
            },
            {
              text: "立ち絵",
              state: directoryTarget === "character",
              onChange: () => changeTarget("character"),
            },
            {
              text: "動画",
              state: directoryTarget === "video",
              onChange: () => changeTarget("video"),
            },
          ]}
        />
      </div>
      <IconDefault children={<GiAtom />} onClick={changeScene} />
    </div>
  );
};

export default ShowDirectory;
