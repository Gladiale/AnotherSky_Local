import styles from "./Control.module.css";
import { useHover } from "../../context/HoverContext";

import FullScreen from "../ControlIcon/FullScreen";
import ToPrev from "../ControlIcon/ToPrev";
import ToNext from "../ControlIcon/ToNext";
import ToFirst from "../ControlIcon/ToFirst";
import ToLast from "../ControlIcon/ToLast";
import VoiceControl from "../ControlIcon/VoiceControl";
import ScreenControl from "../ControlIcon/ScreenControl";
import FilterControl from "../ControlIcon/FilterControl";
import MirrorEffectControl from "../ControlIcon/MirrorEffectControl";
import AutoNext from "../ControlIcon/AutoNext";
import ImageEffectControl from "../ControlIcon/ImageEffectControl";
import RandomControl from "../ControlIcon/RandomControl";
import ShowListImage from "../ControlIcon/ShowListImage";
import Unknown from "../ControlIcon/Unknown";
import RotateYControl from "../ControlIcon/RotateYControl";

const Control = () => {
  const { setIsHovered } = useHover();

  return (
    <div
      className={styles["control-container"]}
      onMouseEnter={() => setIsHovered({ cardHover: true, iconHover: true })}
      onMouseLeave={() => setIsHovered({ cardHover: false, iconHover: false })}
    >
      <ScreenControl />
      <MirrorEffectControl />
      <Unknown />
      <VoiceControl />
      <ToFirst />
      <ToPrev />
      <ShowListImage />
      <FullScreen />
      <RandomControl />
      <ToNext />
      <ToLast />
      <AutoNext />
      <RotateYControl />
      <FilterControl />
      <ImageEffectControl />
    </div>
  );
};

export default Control;
