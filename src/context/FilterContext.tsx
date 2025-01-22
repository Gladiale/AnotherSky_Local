import { createContext, useContext, useReducer } from "react";
import type { FilterDataType } from "../types";

/* 参考サイト
https://qiita.com/Rascal823/items/0f53ffbb410505b707f8
https://qiita.com/akifumii/items/88fb13959a2184174473
https://juejin.cn/post/7088242996004519967
*/

const filterDataInit: FilterDataType = {
  opacity: 100,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  sepia: 0,
  saturate: 100,
  invert: 0,
  hueRotate: 0,
};

type ContextType = {
  filterState: FilterDataType;
  filterDispatch: React.Dispatch<FilterActionType>;
};

type FilterActionType = {
  type: string;
  payload: { effectData: number; allEffect?: FilterDataType };
};

function reducer(state: FilterDataType, action: FilterActionType) {
  switch (action.type) {
    case "opacity":
      return { ...state, opacity: action.payload.effectData };
    case "brightness":
      return { ...state, brightness: action.payload.effectData };
    case "contrast":
      return { ...state, contrast: action.payload.effectData };
    case "grayscale":
      return { ...state, grayscale: action.payload.effectData };
    case "hueRotate":
      return { ...state, hueRotate: action.payload.effectData };
    case "invert":
      return { ...state, invert: action.payload.effectData };
    case "saturate":
      return { ...state, saturate: action.payload.effectData };
    case "sepia":
      return { ...state, sepia: action.payload.effectData };
    case "apply":
      return { ...state, ...action.payload.allEffect };
    case "reset":
      return filterDataInit;
    default:
      throw new Error("不明なactionです");
  }
}

const FilterContext = createContext({} as ContextType);

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filterState, filterDispatch] = useReducer(reducer, filterDataInit);

  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  return useContext(FilterContext);
};

export { FilterProvider, useFilter };
