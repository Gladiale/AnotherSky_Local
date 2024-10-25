import styles from "./Content.module.css";
import { useScene } from "../../context/SceneContext";
import { useImageList } from "../../context/ImageListState";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import Card from "../Card/Card";
import StandImage from "../StandImage/StandImage";
import Video from "../Video/Video";
import ListImage from "../ListImage/ListImage";
import ListImageMode2 from "../ListImageMode2/ListImageMode2";
import Directory from "../Directory/Directory";

const Content = () => {
  const { scene } = useScene();
  const { listSubState } = useImageList();
  const { effectState } = useEffectState();

  return (
    <div className={`${styles.content} ${effectState.mirrorEffect ? styles.mirror : ""}`}>
      {scene != "card-stand" && <StandImage />}
      {(scene === "card-cg" || scene === "card-stand") && <Card />}
      {scene === "card-listImg" && !listSubState.mode2 && <ListImage />}
      {scene === "card-listImg" && listSubState.mode2 && <ListImageMode2 />}
      {scene === "directoryMode" && <Directory />}
      {scene === "card-video" && <Video />}
      {scene != "card-stand" && !effectState.mirrorEffect && (
        <StandImage imgStyle={{ transform: "rotateY(180deg)" }} />
      )}
    </div>
  );
};

export default Content;
