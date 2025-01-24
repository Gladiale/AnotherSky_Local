import { createContext, useContext, useReducer } from "react";
import {
  ornamentInfoInit,
  type OrnamentInfoType,
  ornamentStateInit,
  type OrnamentStateType,
} from "./ornamentInit";
import {
  ornamentInfoReducer,
  type OrnamentInfoActionType,
} from "./reducer/OrnamentInfoReducer";
import {
  ornamentStateReducer,
  type OrnamentStateActionType,
} from "./reducer/ornamentStateReducer";

type OrnamentInfoContextType = {
  ornamentInfo: OrnamentInfoType;
  ornamentInfoDispatch: React.Dispatch<OrnamentInfoActionType>;
};

type OrnamentStateContextType = {
  ornamentState: OrnamentStateType;
  ornamentStateDispatch: React.Dispatch<OrnamentStateActionType>;
};

const OrnamentInfoContext = createContext({} as OrnamentInfoContextType);
const OrnamentStateContext = createContext({} as OrnamentStateContextType);

const OrnamentProvider = ({ children }: { children: React.ReactNode }) => {
  const [ornamentInfo, ornamentInfoDispatch] = useReducer(
    ornamentInfoReducer,
    ornamentInfoInit
  );
  const [ornamentState, ornamentStateDispatch] = useReducer(
    ornamentStateReducer,
    ornamentStateInit
  );

  return (
    <OrnamentInfoContext.Provider value={{ ornamentInfo, ornamentInfoDispatch }}>
      <OrnamentStateContext.Provider value={{ ornamentState, ornamentStateDispatch }}>
        {children}
      </OrnamentStateContext.Provider>
    </OrnamentInfoContext.Provider>
  );
};

const useOrnamentInfo = () => {
  return useContext(OrnamentInfoContext);
};

const useOrnamentState = () => {
  return useContext(OrnamentStateContext);
};

export { OrnamentProvider, useOrnamentInfo, useOrnamentState };
