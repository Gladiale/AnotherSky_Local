import { GiCyberEye } from "react-icons/gi";
import styles from "./VideoControl.module.css";
import IconSpecial from "../../Common/IconSpecial";

type PropsType = {
  videoHovered: boolean;
  setHasControl: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoControl = ({ videoHovered, setHasControl }: PropsType) => {
  const changeControl = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasControl((prev) => !prev);
  };

  return (
    <div className={`${styles["control-box"]} ${videoHovered && styles.show}`}>
      <IconSpecial children={<GiCyberEye />} onClick={changeControl} />
    </div>
  );
};

export default VideoControl;
