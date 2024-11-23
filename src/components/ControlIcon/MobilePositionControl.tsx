import { GiBirdClaw } from "react-icons/gi";
import { useMediaState } from "../../context/MediaStateContext";
import IconDefault from "../Common/IconDefault";

const MobilePositionControl = () => {
  const { mediaState, setMediaState } = useMediaState();

  const handleTouchMode = () => {
    setMediaState({
      ...mediaState,
      touchMode: mediaState.touchMode === "positionMode" ? "rotateMod" : "positionMode",
    });
  };

  return (
    <IconDefault
      anime={mediaState.touchMode === "positionMode" && "anime-color-2nd"}
      onClick={handleTouchMode}
    >
      <GiBirdClaw />
    </IconDefault>
  );
};

export default MobilePositionControl;
