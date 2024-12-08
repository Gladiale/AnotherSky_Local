import styles from "./Video.module.css";
import { GiCampfire, GiCyberEye } from "react-icons/gi";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import IconSpecial from "../Common/IconSpecial";

type PropsType = {
  isLocked: boolean;
  setHasControl: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoControl = ({ isLocked, setHasControl, setIsLocked }: PropsType) => {
  const { appOption } = useAppOption();

  const changeControl = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasControl((prev) => !prev);
  };

  return (
    <div className={styles["control-box"]}>
      <IconSpecial
        effect={appOption.dropShadow.video ? false : appOption.dropShadow.icon}
        children={isLocked ? <GiCampfire /> : <GiCyberEye />}
        onClick={changeControl}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsLocked((prev) => !prev);
        }}
      />
    </div>
  );
};

export default VideoControl;
