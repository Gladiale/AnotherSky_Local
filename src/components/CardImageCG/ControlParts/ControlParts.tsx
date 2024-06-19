import styles from "./ControlParts.module.css";
import { GiCrenelCrown } from "react-icons/gi";
import { useHover } from "../../../context/HoverContext";
import {
  useCardCharacterInfo,
  useCardCharacterState,
} from "../../../context/CardCharacterContext";

const ControlParts = () => {
  const { isHovered } = useHover();
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
      <GiCrenelCrown className={styles.icon} onClick={changeContent} />
    </div>
  );
};

export default ControlParts;
