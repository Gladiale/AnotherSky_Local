import styles from "./Content.module.css";
import { useScene } from "../../context/SceneContext";
import { useImageList } from "../../context/ImageListState";
import { useCharaOffsetX } from "../../hooks/useCharaOffsetX";
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
  const { listState } = useImageList();
  const { mediaActive } = useMediaActive();
  const { effectState } = useEffectState();
  const { offsetX } = useCharaOffsetX();

  return (
    <div
      className={`${styles.content} ${scene === "card" && styles.threeD}
      ${effectState.mirror && styles.mirror}`}
    >
      {scene != "card" && (
        <Character containerStyle={{ transform: `translateX(${offsetX}px)` }} />
      )}
      {scene === "card" && <Card />}
      {scene === "cg" && mediaActive.doublePage ? (
        <FlipBook />
      ) : (
        scene === "cg" && <CGbox />
      )}
      {scene === "video" && <Video />}
      {scene === "directoryMode" && <Directory />}
      {scene === "listImg" && !listState.mode2 && <ListImage />}
      {scene === "listImg" && listState.mode2 && <ListImageMode2 />}
      {scene != "card" && !effectState.mirror && (
        <Character
          containerStyle={{ transform: `rotateY(180deg) translateX(${offsetX}px)` }}
        />
      )}
    </div>
  );
};

export default Content;
