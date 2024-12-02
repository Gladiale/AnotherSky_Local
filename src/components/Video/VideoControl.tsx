import styles from "./Video.module.css";
import { GiCyberEye } from "react-icons/gi";
import { useAppOption } from "../../context/AppOptionContext";
import IconSpecial from "../Common/IconSpecial";

type PropsType = {
  setHasControl: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoControl = ({ setHasControl }: PropsType) => {
  const { optionData } = useAppOption();

  const changeControl = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasControl((prev) => !prev);
  };

  return (
    <div className={styles["control-box"]}>
      <IconSpecial
        effect={optionData.iconShadow && true}
        children={<GiCyberEye />}
        onClick={changeControl}
      />
    </div>
  );
};

export default VideoControl;
