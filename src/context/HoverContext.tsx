import { createContext, useContext, useReducer } from "react";

type HoverStateType = {
  cg: boolean;
  card: boolean;
  icon: boolean;
};

const hoverStateInit = {
  cg: false,
  card: false,
  icon: false,
};

type HoverActionType = {
  type: keyof HoverStateType;
  payload: "enter" | "leave";
};

function hoverReducer(state: HoverStateType, action: HoverActionType) {
  switch (action.type) {
    case "card":
      return action.payload === "enter"
        ? { ...state, card: true, icon: false }
        : { ...state, card: false };
    case "icon":
      return action.payload === "enter"
        ? { ...state, card: true, icon: true }
        : { ...state, card: false, icon: false };
    case "cg":
      return action.payload === "enter"
        ? { ...state, cg: true, icon: false }
        : { ...state, cg: false };
    default:
      throw new Error("不明なactionです");
  }
}

type HoverContextType = {
  hoverState: HoverStateType;
  hoverDispatch: React.Dispatch<HoverActionType>;
};

const HoverContext = createContext({} as HoverContextType);

const HoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoverState, hoverDispatch] = useReducer(hoverReducer, hoverStateInit);

  return (
    <HoverContext.Provider value={{ hoverState, hoverDispatch }}>
      {children}
    </HoverContext.Provider>
  );
};

const useHover = () => {
  return useContext(HoverContext);
};

export { HoverProvider, useHover };
