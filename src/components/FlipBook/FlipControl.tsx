import styles from "./FlipBook.module.css";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import {
  useMediaActive,
  useMediaInfo,
} from "../../context/MediaInfoContext/MediaInfoContext";
import { useInformation } from "../../hooks/useInformation";
import { GiCrownedHeart } from "react-icons/gi";
import IconSpecial from "../Common/IconSpecial";

type PropsType = {
  isMobileSize: boolean;
  setIsReversing: React.Dispatch<React.SetStateAction<Boolean>>;
};

const FlipControl = ({ isMobileSize, setIsReversing }: PropsType) => {
  const { appOption } = useAppOption();
  const { infoActive } = useInformation();
  const { mediaInfoDispatch } = useMediaInfo();
  const { mediaActive, setMediaActive } = useMediaActive();

  const reverseContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isMobileSize) {
      setMediaActive((prev) => ({ ...prev, anotherCharacter: !prev.anotherCharacter }));
      if (!mediaActive.anotherCharacter) {
        mediaInfoDispatch({ type: "initAnother" });
      }
    } else {
      setIsReversing((prev) => !prev);
    }
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
