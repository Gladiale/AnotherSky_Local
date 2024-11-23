import styles from "./IconListTrigger.module.css";
import IconDefault from "../Common/IconDefault";
import { GiGothicCross } from "react-icons/gi";
import { useFullScreen } from "../../hooks/useFullScreen";

type PropsType = {
  boxKey: "1st" | "2nd";
  handleListTrigger: () => void;
};

const IconListTriggerDesk = ({ handleListTrigger, boxKey }: PropsType) => {
  const { changeFullScreen } = useFullScreen();

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    changeFullScreen();
  };

  return (
    <div className={styles["icon-container"]}>
      {boxKey === "1st" && <p>RightClick→FullScreen</p>}
      <IconDefault onClick={handleListTrigger} onContextMenu={handleContextMenu}>
        <GiGothicCross />
      </IconDefault>
    </div>
  );
};

export default IconListTriggerDesk;
