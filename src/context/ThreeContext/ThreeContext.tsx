import { createContext, useContext, useReducer } from "react";
import {
  threeInfoInit,
  threeStateInit,
  type ThreeInfoType,
  type ThreeStateType,
} from "./threeInit";
import { threeInfoReducer, type ThreeInfoActionType } from "./reducer/threeInfoReducer";
import {
  threeStateReducer,
  type ThreeStateActionType,
} from "./reducer/threeStateReducer";

type ThreeInfoContextType = {
  threeInfo: ThreeInfoType;
  threeInfoDispatch: React.Dispatch<ThreeInfoActionType>;
};

type ThreeStateContextType = {
  threeState: ThreeStateType;
  threeStateDispatch: React.Dispatch<ThreeStateActionType>;
};

const ThreeInfoContext = createContext({} as ThreeInfoContextType);
const ThreeStateContext = createContext({} as ThreeStateContextType);

const ThreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [threeInfo, threeInfoDispatch] = useReducer(threeInfoReducer, threeInfoInit);
  const [threeState, threeStateDispatch] = useReducer(threeStateReducer, threeStateInit);

  return (
    <ThreeInfoContext.Provider value={{ threeInfo, threeInfoDispatch }}>
      <ThreeStateContext.Provider value={{ threeState, threeStateDispatch }}>
        {children}
      </ThreeStateContext.Provider>
    </ThreeInfoContext.Provider>
  );
};

const useThreeInfo = () => {
  return useContext(ThreeInfoContext);
};

const useThreeState = () => {
  return useContext(ThreeStateContext);
};

export { ThreeProvider, useThreeInfo, useThreeState };
