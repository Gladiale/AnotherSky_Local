import styles from "./Character.module.css";
import { useScene } from "../../context/SceneContext";
import { useFilter } from "../../context/FilterContext";
import { useFilterData } from "../../hooks/useFilterData";
import { useMediaActive } from "../../context/MediaInfoContext/MediaInfoContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import CharacterParts from "./CharacterParts";

type PropsType = {
  containerStyle?: React.CSSProperties;
};

const Character = ({ containerStyle }: PropsType) => {
  const { scene } = useScene();
  const { filterState } = useFilter();
  const { mediaActive } = useMediaActive();
  const { effectState } = useEffectState();
  const { filterData } = useFilterData("character");

  const isTopLevel: boolean =
    mediaActive.doublePage || effectState.mirror || scene === "directoryMode";

  return (
    <div
      className={styles["character-container"]}
      style={{
        filter: filterData,
        imageRendering:
          effectState.pixel && effectState.target.character ? "pixelated" : undefined,
        display:
          effectState.target.character && filterState.opacity === 0 ? "none" : undefined,
        maxWidth: isTopLevel ? "none" : undefined,
        zIndex: isTopLevel ? 99 : undefined,
        ...containerStyle,
      }}
    >
      <CharacterParts />
    </div>
  );
};

export default Character;
