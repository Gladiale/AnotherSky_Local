import styles from "./CGbox.module.css";
import { GiCrenelCrown } from "react-icons/gi";
import { useScene } from "../../context/SceneContext";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useInformation } from "../../hooks/useInformation";
import {
  useMediaInfo,
  useMediaActive,
} from "../../context/MediaInfoContext/MediaInfoContext";
import IconSpecial from "../Common/IconSpecial";

const ControlParts = () => {
  const { setScene } = useScene();
  const { appOption } = useAppOption();
  const { mediaInfoDispatch } = useMediaInfo();
  const { infoActive } = useInformation();
  const { mediaActive, setMediaActive } = useMediaActive();

  const changeContent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaActive((prev) => ({ ...prev, anotherCharacter: !prev.anotherCharacter }));
    if (!mediaActive.anotherCharacter) {
      mediaInfoDispatch({ type: "initAnother" });
    } else {
      setScene("cg");
    }
  };

  return (
    <div
      className={styles["control-box"]}
      style={{ opacity: infoActive ? 0 : undefined }}
    >
      <IconSpecial
        effect={appOption.dropShadow.cg ? false : appOption.dropShadow.icon}
        children={<GiCrenelCrown />}
        onClick={changeContent}
      />
    </div>
  );
};

export default ControlParts;
