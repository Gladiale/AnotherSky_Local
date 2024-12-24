import styles from "./RangeBox.module.css";
import { useFilter } from "../../../context/FilterContext";

const RangeBox = () => {
  const { filterState, filterDispatch } = useFilter();
  const handleEffect = (e: React.ChangeEvent<HTMLInputElement>, effectName: string) => {
    filterDispatch({
      type: effectName,
      payload: { effectData: Number(e.target.value) },
    });
  };

  return (
    <div className={styles["range-box"]}>
      <label>
        <span>opacity</span>
        <input
          type="range"
          min="0"
          max="100"
          value={filterState.opacity}
          onChange={(e) => handleEffect(e, "opacity")}
        />
      </label>

      <label>
        <span>brightness</span>
        <input
          type="range"
          min="40"
          max="300"
          value={filterState.brightness}
          onChange={(e) => handleEffect(e, "brightness")}
        />
      </label>

      <label>
        <span>contrast</span>
        <input
          type="range"
          min="10"
          max="500"
          value={filterState.contrast}
          onChange={(e) => handleEffect(e, "contrast")}
        />
      </label>

      <label>
        <span>grayscale</span>
        <input
          type="range"
          min="0"
          max="100"
          value={filterState.grayscale}
          onChange={(e) => handleEffect(e, "grayscale")}
        />
      </label>

      <label>
        <span>hue-rotate</span>
        <input
          type="range"
          min="0"
          max="360"
          value={filterState.hueRotate}
          onChange={(e) => handleEffect(e, "hueRotate")}
        />
      </label>

      <label>
        <span>invert</span>
        <input
          type="range"
          min="0"
          max="100"
          value={filterState.invert}
          onChange={(e) => handleEffect(e, "invert")}
        />
      </label>

      <label>
        <span>saturate</span>
        <input
          type="range"
          min="0"
          max="600"
          value={filterState.saturate}
          onChange={(e) => handleEffect(e, "saturate")}
        />
      </label>

      <label>
        <span>sepia</span>
        <input
          type="range"
          min="0"
          max="100"
          value={filterState.sepia}
          onChange={(e) => handleEffect(e, "sepia")}
        />
      </label>
    </div>
  );
};

export default RangeBox;
