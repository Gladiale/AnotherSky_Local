import { GiCyberEye } from "react-icons/gi";
import styles from "./VideoControl.module.css";

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
      <GiCyberEye className={styles.icon} onClick={changeControl} />
    </div>
  );
};

export default VideoControl;
