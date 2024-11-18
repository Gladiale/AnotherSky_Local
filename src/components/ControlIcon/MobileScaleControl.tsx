import { GiBee } from "react-icons/gi";
import { useMediaState } from "../../context/MediaStateContext";
import IconDefault from "../Common/IconDefault";

const MobileScaleControl = () => {
  const { mediaState, setMediaState } = useMediaState();

  const handleTouchMode = () => {
    setMediaState({
      ...mediaState,
      touchMode: mediaState.touchMode === "scaleMode" ? "rotateMod" : "scaleMode",
    });
  };

  return (
    <IconDefault
      className={mediaState.touchMode === "scaleMode" && "anime-color-2nd"}
      onClick={handleTouchMode}
    >
      <GiBee style={{ transform: "rotateY(180deg)" }} />
    </IconDefault>
  );
};

export default MobileScaleControl;
