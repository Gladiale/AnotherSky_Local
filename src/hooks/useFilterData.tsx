import { useFilter } from "../context/FilterContext";
import { useEffectState } from "../context/EffectState/EffectStateContext";
import { useAppOption } from "../context/AppOptionContext";

const useFilterData = (target: "cg" | "character") => {
  const { filterState } = useFilter();
  const { effectState } = useEffectState();
  const { optionData } = useAppOption();

  const filterShadow = `drop-shadow(0 0 5px #86fff3) drop-shadow(0 0 15px #fc3eff)`;
  const filterNoShadow = `opacity(${filterState.opacity}%) brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`;

  let filterData: string | undefined;
  if (target === "character") {
    filterData = effectState.filterEffect.targetCharacter
      ? optionData.characterShadow
        ? filterShadow + filterNoShadow
        : filterNoShadow
      : optionData.characterShadow
      ? filterShadow
      : undefined;
  }

  if (target === "cg") {
    filterData = effectState.filterEffect.targetCard
      ? optionData.cgShadow
        ? filterShadow + filterNoShadow
        : filterNoShadow
      : optionData.cgShadow
      ? undefined
      : undefined;
  }
  return { filterData };
};

export { useFilterData };
