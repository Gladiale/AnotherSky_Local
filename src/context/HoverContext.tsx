import { createContext, useContext, useReducer } from "react";

type HoverStateType = {
  // cg: boolean;
  card: boolean;
  icon: boolean;
  // ここのspecialはcardに特殊な効果をもたらす
  special: boolean;
};

const hoverStateInit: HoverStateType = {
  // cg: false,
  card: false,
  icon: false,
  special: false,
};

type NormalActionType = {
  type: keyof Omit<HoverStateType, "special">;
  payload: "enter" | "leave";
};

type ExtraActionType = {
  type: "special";
};

type HoverActionType = NormalActionType | ExtraActionType;

function hoverReducer(state: HoverStateType, action: HoverActionType) {
  switch (action.type) {
    case "card":
      return action.payload === "enter"
        ? { ...state, card: true, special: false }
        : { ...state, card: false };
    case "icon":
      return action.payload === "enter"
        ? { ...state, icon: true, special: false }
        : { ...state, icon: false };
    case "special":
      return { ...state, special: true, card: false, icon: false };
    // case "cg":
    //   return action.payload === "enter"
    //     ? { ...state, cg: true }
    //     : { ...state, cg: false };
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
