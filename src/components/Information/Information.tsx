import styles from "./Information.module.css";
import { useHover } from "../../context/HoverContext";
import { useInformation } from "../../hooks/useInformation";
import { useMediaActive } from "../../context/MediaInfoContext/MediaInfoContext";

const Information = () => {
  const { hoverState } = useHover();
  const { mediaActive } = useMediaActive();
  const { infoData, infoActive, infoState } = useInformation();

  return (
    <div
      className={`${styles.information}
      ${(hoverState.icon || infoActive) && styles.infoActive}`}
    >
      <p className={infoState.voice ? styles.active : ""}>
        {infoData.voice}
        {mediaActive.anotherCharacter && (
          <span className={infoState.anotherCharacter ? styles.active : ""}>
            {infoData.anotherCharacter}
          </span>
        )}
      </p>
      <p>
        <span className={infoState.character ? styles.active : ""}>
          {infoData.character}
        </span>
        <span className={infoState.cg ? styles.active : ""}>{infoData.cg}</span>
        <span className={infoState.video ? styles.active : ""}>{infoData.video}</span>
        <span className={infoState.effect ? styles.active : ""}>{infoData.effect}</span>
      </p>
    </div>
  );
};

export default Information;
