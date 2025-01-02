import styles from "./CGbox.module.css";
import { GiCrenelCrown, GiSharpCrown } from "react-icons/gi";
import { useScene } from "../../context/SceneContext";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import {
  useMediaInfo,
  useMediaActive,
} from "../../context/MediaInfoContext/MediaInfoContext";
import { useInformation } from "../../hooks/useInformation";
import IconSpecial from "../Common/IconSpecial";

const ControlParts = () => {
  const { setScene } = useScene();
  const { appOption } = useAppOption();
  const { infoActive } = useInformation();
  const { mediaInfoDispatch } = useMediaInfo();
  const { mediaActive, setMediaActive } = useMediaActive();
  const { threeState, threeStateDispatch } = useThreeState();

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
        children={threeState.active.threeD ? <GiSharpCrown /> : <GiCrenelCrown />}
        onClick={
          threeState.active.threeD
            ? () => threeStateDispatch({ type: "active", payload: "controlPanel" })
            : changeContent
        }
      />
    </div>
  );
};

export default ControlParts;
