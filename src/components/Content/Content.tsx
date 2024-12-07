import styles from "./Content.module.css";
import { useScene } from "../../context/SceneContext";
import { useImageList } from "../../context/ImageListState";
import { useMediaActive } from "../../context/MediaInfoContext/MediaInfoContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import Card from "../Card/Card";
import CGbox from "../CGbox/CGbox";
import Video from "../Video/Video";
import FlipBook from "../FlipBook/FlipBook";
import Character from "../Character/Character";
import Directory from "../Directory/Directory";
import ListImage from "../ListImage/ListImage";
import ListImageMode2 from "../ListImageMode2/ListImageMode2";

const Content = () => {
  const { scene } = useScene();
  const { listSubState } = useImageList();
  const { mediaActive } = useMediaActive();
  const { effectState } = useEffectState();

  return (
    <div
      className={`${styles.content} ${scene === "card" && styles.threeD}
      ${effectState.mirrorEffect && styles.mirror}`}
    >
      {scene != "card" && <Character />}
      {scene === "card" && <Card />}
      {scene === "cg" && mediaActive.doublePage ? (
        <FlipBook />
      ) : (
        scene === "cg" && <CGbox />
      )}
      {scene === "video" && <Video />}
      {scene === "directoryMode" && <Directory />}
      {scene === "listImg" && !listSubState.mode2 && <ListImage />}
      {scene === "listImg" && listSubState.mode2 && <ListImageMode2 />}
      {scene != "card" && !effectState.mirrorEffect && (
        <Character imgStyle={{ transform: "rotateY(180deg)" }} />
      )}
    </div>
  );
};

export default Content;
