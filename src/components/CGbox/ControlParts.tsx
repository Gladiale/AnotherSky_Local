import styles from "./CGbox.module.css";
import { GiCrenelCrown } from "react-icons/gi";
import { useScene } from "../../context/SceneContext";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useInformation } from "../../hooks/useInformation";
import {
  useAnotherCharacter,
  useMediaInfo,
} from "../../context/MediaInfoContext/MediaInfoContext";
import IconSpecial from "../Common/IconSpecial";

const ControlParts = () => {
  const { setScene } = useScene();
  const { appOption } = useAppOption();
  const { mediaInfoDispatch } = useMediaInfo();
  const { infoActive } = useInformation();
  const { anotherActive, setAnotherActive } = useAnotherCharacter();

  const changeContent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnotherActive((prev) => !prev);
    if (!anotherActive) {
      mediaInfoDispatch({ type: "initAnother" });
      setScene("anotherCharacter");
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
        effect={appOption.dropShadow.icon}
        children={<GiCrenelCrown />}
        onClick={changeContent}
      />
    </div>
  );
};

export default ControlParts;
