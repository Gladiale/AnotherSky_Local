import styles from "./Content.module.css";
import { useScene } from "../../context/SceneContext";
import { useImageList } from "../../context/ImageListState";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import Card from "../Card/Card";
import Video from "../Video/Video";
import Character from "../Character/Character";
import ListImage from "../ListImage/ListImage";
import ListImageMode2 from "../ListImageMode2/ListImageMode2";
import Directory from "../Directory/Directory";

const Content = () => {
  const { scene } = useScene();
  const { listSubState } = useImageList();
  const { effectState } = useEffectState();

  return (
    <div className={`${styles.content} ${effectState.mirrorEffect ? styles.mirror : ""}`}>
      {scene != "card" && <Character />}
      {(scene === "cg" || scene === "card" || scene === "anotherCharacter") && <Card />}
      {scene === "listImg" && !listSubState.mode2 && <ListImage />}
      {scene === "listImg" && listSubState.mode2 && <ListImageMode2 />}
      {scene === "directoryMode" && <Directory />}
      {scene === "video" && <Video />}
      {scene != "card" && !effectState.mirrorEffect && (
        <Character imgStyle={{ transform: "rotateY(180deg)" }} />
      )}
    </div>
  );
};

export default Content;
