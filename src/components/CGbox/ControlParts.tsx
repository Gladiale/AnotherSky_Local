import styles from "./ControlParts.module.css";
import { GiCrenelCrown } from "react-icons/gi";
import { useScene } from "../../context/SceneContext";
import { useHover } from "../../context/HoverContext";
import { useAppOption } from "../../context/AppOptionContext";
import {
  useAnotherCharacter,
  useMediaInfo,
} from "../../context/MediaInfoContext/MediaInfoContext";
import IconSpecial from "../Common/IconSpecial";

const ControlParts = () => {
  const { isHovered } = useHover();
  const { setScene } = useScene();
  const { optionData } = useAppOption();
  const { mediaDispatch } = useMediaInfo();
  const { anotherActive, setAnotherActive } = useAnotherCharacter();

  const changeContent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnotherActive((prev) => !prev);
    if (!anotherActive) {
      mediaDispatch({ type: "initAnother" });
      setScene("anotherCharacter");
    } else {
      setScene("cg");
    }
  };

  return (
    <div
      className={`${styles["control-box"]} ${
        isHovered.cardHover && !isHovered.iconHover ? styles.show : ""
      }`}
    >
      <IconSpecial
        effect={optionData.iconShadow}
        children={<GiCrenelCrown />}
        onClick={changeContent}
      />
    </div>
  );
};

export default ControlParts;
