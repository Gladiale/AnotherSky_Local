import styles from "./FullScreen.module.css";
import { useEffect, useState } from "react";
import {
  type SceneType,
  useScene,
  useDirectoryInfo,
  DirectoryTargetType,
} from "../../context/SceneContext";
import { GiAllSeeingEye, GiEclipseFlare } from "react-icons/gi";
import CheckBoxType2 from "./ControlParts/CheckBoxType2";
import RadioBox from "./ControlParts/RadioBox";

const FullScreen = () => {
  // フルスクリーン(https://gray-code.com/javascript/display-the-page-in-full-screen/)
  // コンポーネント外の操作は副作用なので、useEffectを使います
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isDirectory, setIsDirectory] = useState<boolean>(false);
  const [beforeScene, setBeforeScene] = useState<SceneType | null>(null);

  const { scene, setScene } = useScene();
  const { directoryTarget, setDirectoryTarget, setPageIndex } =
    useDirectoryInfo();

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

  useEffect(() => {
    if (document.fullscreenElement === null && isFullScreen) {
      document.body.requestFullscreen();
    } else if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  return (
    <div className={styles["screen-container"]}>
      <div className={`${styles.wrapper} ${isDirectory && styles.active}`}>
        <CheckBoxType2
          messageList={["ディレクトリ"]}
          checkedList={[isDirectory]}
          changeFuncList={[() => setIsDirectory((prev) => !prev)]}
          checkBoxSize="middle"
        />
        {isDirectory && (
          <RadioBox
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
        )}
      </div>
      {isDirectory ? (
        <GiAllSeeingEye className={styles.icon} onClick={changeScene} />
      ) : (
        <GiEclipseFlare
          className={styles.icon}
          onClick={() => setIsFullScreen((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default FullScreen;
