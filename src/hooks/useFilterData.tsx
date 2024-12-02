import { useFilter } from "../context/FilterContext";
import { useEffectState } from "../context/EffectStateContext/EffectStateContext";
import { useAppOption } from "../context/AppOptionContext";

const useFilterData = (target: "card" | "cg" | "character" | "video") => {
  const { filterState } = useFilter();
  const { effectState } = useEffectState();
  const { optionData } = useAppOption();

  const filterShadow = `drop-shadow(0 0 5px #86fff3) drop-shadow(0 0 15px #fc3eff)`;
  const filterNoShadow = `opacity(${filterState.opacity}%) brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`;

  let filterData: string | undefined;
  if (target === "card") {
    filterData = effectState.filterEffect.targetCard ? filterNoShadow : undefined;
  }

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

  if (target === "video") {
    filterData = effectState.filterEffect.targetVideo
      ? optionData.videoShadow
        ? filterShadow + filterNoShadow
        : filterNoShadow
      : optionData.videoShadow
      ? undefined
      : undefined;
  }

  return { filterData };
};

export { useFilterData };
