import { GiSunbeams } from "react-icons/gi";
import { useFullScreen } from "../../hooks/useFullScreen";
import { useMediaState } from "../../context/MediaStateContext";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  boxKey: "1st" | "2nd";
  handleListTrigger: () => void;
};

const IconListTriggerMobile = ({ handleListTrigger, boxKey }: PropsType) => {
  const { mediaState, setMediaState } = useMediaState();
  const { changeFullScreen } = useFullScreen();

  const handleClick = () => {
    handleListTrigger();
    setMediaState({
      ...mediaState,
      touchMode: boxKey === "1st" ? "rotateMod" : "closed",
    });
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    changeFullScreen();
  };

  return (
    <IconDefault
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      anime={mediaState.touchMode === "rotateMod" && "anime-color-2nd"}
    >
      <GiSunbeams />
    </IconDefault>
  );
};

export default IconListTriggerMobile;
