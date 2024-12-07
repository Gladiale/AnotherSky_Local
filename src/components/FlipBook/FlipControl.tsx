import styles from "./FlipBook.module.css";
import { GiCrownedHeart, GiStarSwirl } from "react-icons/gi";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useInformation } from "../../hooks/useInformation";
import IconSpecial from "../Common/IconSpecial";

type PropsType = {
  setLayerState: React.Dispatch<
    React.SetStateAction<{
      active: "1st" | "2nd";
      page: "first" | "last" | undefined;
      rotateY: boolean;
    }>
  >;
  setIsReversing: React.Dispatch<React.SetStateAction<Boolean>>;
};

const FlipControl = ({ setLayerState, setIsReversing }: PropsType) => {
  const { appOption } = useAppOption();
  const { infoActive } = useInformation();

  const changeLayerRotateY = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setLayerState((prev) => ({
      ...prev,
      rotateY: !prev.rotateY,
    }));
  };

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
        effect={appOption.dropShadow.icon}
        children={<GiStarSwirl />}
        onClick={changeLayerRotateY}
      />
      <IconSpecial
        effect={appOption.dropShadow.icon}
        children={<GiCrownedHeart />}
        onClick={reverseContent}
      />
    </div>
  );
};

export default FlipControl;
