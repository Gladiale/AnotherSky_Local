import styles from "./ControlParts.module.css";
import { GiCrenelCrown } from "react-icons/gi";
import { useHover } from "../../context/HoverContext";
import { useAppOption } from "../../context/AppOptionContext";
import {
  useCardCharacterInfo,
  useCardCharacterState,
} from "../../context/CardCharacterContext";
import IconSpecial from "../Common/IconSpecial";

const ControlParts = () => {
  const { isHovered } = useHover();
  const { optionData } = useAppOption();
  const { isCharacter, setIsCharacter } = useCardCharacterState();
  const { characterInfoDispatch } = useCardCharacterInfo();

  const changeContent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCharacter) {
      characterInfoDispatch({ type: "deleteData" });
    }
    setIsCharacter((prev) => !prev);
  };

  return (
    <div
      className={`${styles["control-box"]} ${
        isHovered.cardHover && !isHovered.iconHover ? styles.show : undefined
      }`}
    >
      <IconSpecial
        effect={optionData.iconShadow && true}
        children={<GiCrenelCrown />}
        onClick={changeContent}
      />
    </div>
  );
};

export default ControlParts;
