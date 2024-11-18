import { GiSunbeams } from "react-icons/gi";
import { useMediaState } from "../../context/MediaStateContext";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  boxKey: "1st" | "2nd";
  handleListTrigger: () => void;
};

const MobileIconListTrigger = ({ handleListTrigger, boxKey }: PropsType) => {
  const { mediaState, setMediaState } = useMediaState();

  const handleClick = () => {
    handleListTrigger();
    setMediaState({
      ...mediaState,
      touchMode: boxKey === "1st" ? "rotateMod" : "closed",
    });
  };

  return (
    <IconDefault
      onClick={handleClick}
      className={mediaState.touchMode === "rotateMod" && "anime-color-2nd"}
    >
      <GiSunbeams />
    </IconDefault>
  );
};

export default MobileIconListTrigger;
