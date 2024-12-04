import { useFilter } from "../context/FilterContext";
import { useAppOption } from "../context/AppOptionContext/AppOptionContext";
import { useEffectState } from "../context/EffectStateContext/EffectStateContext";

const useFilterData = (target: "card" | "cg" | "character" | "video") => {
  const { filterState } = useFilter();
  const { effectState } = useEffectState();
  const { appOption } = useAppOption();

  const filterShadow = `drop-shadow(0 0 5px #86fff3) drop-shadow(0 0 15px #fc3eff)`;
  const filterNoShadow = `opacity(${filterState.opacity}%) brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`;

  let filterData: string | undefined;
  if (target === "card") {
    filterData = effectState.filterEffect.targetCard ? filterNoShadow : undefined;
  }

  if (target === "character") {
    filterData = effectState.filterEffect.targetCharacter
      ? appOption.dropShadow.character
        ? filterShadow + filterNoShadow
        : filterNoShadow
      : appOption.dropShadow.character
      ? filterShadow
      : undefined;
  }

  if (target === "cg") {
    filterData = effectState.filterEffect.targetCard
      ? appOption.dropShadow.cg
        ? filterShadow + filterNoShadow
        : filterNoShadow
      : appOption.dropShadow.cg
      ? undefined
      : undefined;
  }

  if (target === "video") {
    filterData = effectState.filterEffect.targetVideo
      ? appOption.dropShadow.video
        ? filterShadow + filterNoShadow
        : filterNoShadow
      : appOption.dropShadow.video
      ? undefined
      : undefined;
  }

  return { filterData };
};

export { useFilterData };
