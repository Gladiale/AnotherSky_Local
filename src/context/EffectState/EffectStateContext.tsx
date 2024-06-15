import { createContext, useContext, useReducer } from "react";
import { EffectStateType, effectSateInit } from "./effectStateInit";
import { EFStateActionType, effectStateReducer } from "./effectStateReducer";

type ContextType = {
  effectState: EffectStateType;
  effectStateDispatch: React.Dispatch<EFStateActionType>;
};

const EffectStateContext = createContext({} as ContextType);

const EffectStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [effectState, effectStateDispatch] = useReducer(
    effectStateReducer,
    effectSateInit
  );

  return (
    <EffectStateContext.Provider value={{ effectState, effectStateDispatch }}>
      {children}
    </EffectStateContext.Provider>
  );
};

const useEffectState = () => {
  return useContext(EffectStateContext);
};

export { EffectStateProvider, useEffectState };
