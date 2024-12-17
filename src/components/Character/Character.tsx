import styles from "./Character.module.css";
import { useFilter } from "../../context/FilterContext";
import { useFilterData } from "../../hooks/useFilterData";
import { useMediaActive } from "../../context/MediaInfoContext/MediaInfoContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import CharacterParts from "./CharacterParts";

type PropsType = {
  containerStyle?: React.CSSProperties;
  handleOverLimit: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

const Character = ({ containerStyle, handleOverLimit }: PropsType) => {
  const { filterState } = useFilter();
  const { mediaActive } = useMediaActive();
  const { effectState } = useEffectState();
  const { filterData } = useFilterData("character");

  return (
    <div
      className={styles["character-container"]}
      style={{
        filter: filterData,
        imageRendering: effectState.pixelEffect ? "pixelated" : undefined,
        display:
          effectState.filterEffect.targetCharacter && filterState.opacity === 0
            ? "none"
            : undefined,
        maxWidth: mediaActive.doublePage || effectState.mirrorEffect ? "none" : undefined,
        zIndex: mediaActive.doublePage || effectState.mirrorEffect ? 99 : undefined,
        ...containerStyle,
      }}
    >
      <CharacterParts handleOverLimit={handleOverLimit} />
    </div>
  );
};

export default Character;
