import styles from "./FlipBook.module.css";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useInformation } from "../../hooks/useInformation";
import { GiCrownedHeart } from "react-icons/gi";
import IconSpecial from "../Common/IconSpecial";

type PropsType = {
  setIsReversing: React.Dispatch<React.SetStateAction<Boolean>>;
};

const FlipControl = ({ setIsReversing }: PropsType) => {
  const { appOption } = useAppOption();
  const { infoActive } = useInformation();

  const reverseContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsReversing((prev) => !prev);
  };

  return (
    <div
      className={styles["control-box"]}
      style={{ opacity: infoActive ? 0 : undefined }}
    >
      <IconSpecial
        effect={appOption.dropShadow.cg ? false : appOption.dropShadow.icon}
        children={<GiCrownedHeart />}
        onClick={reverseContent}
      />
    </div>
  );
};

export default FlipControl;
