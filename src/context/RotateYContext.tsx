import { createContext, useContext, useReducer } from "react";
import { type SceneType } from "./SceneContext";

// デフォルト値
type rotateYType = {
  card: boolean;
  cg: boolean;
  character: boolean;
  video: boolean;
  effect: boolean;
  listImg: boolean;
};

const rotateYInit = {
  card: false,
  cg: false,
  character: false,
  video: false,
  effect: false,
  listImg: false,
};

// Reducer Action Type
type RotateYActionType = {
  type: SceneType;
  payload: { isTachie?: boolean; isEffect?: boolean; isReset?: boolean };
};

function reducer(state: rotateYType, action: RotateYActionType): rotateYType {
  let newState: rotateYType;

  switch (action.type) {
    case "card":
      newState = { ...state, card: !state.card };
      break;
    case "cg":
      if (action.payload.isTachie || action.payload.isEffect) {
        newState = { ...state };
      } else {
        newState = { ...state, cg: !state.cg };
      }
      break;
    case "video":
      if (action.payload.isTachie || action.payload.isEffect) {
        newState = { ...state };
      } else {
        newState = { ...state, video: !state.video };
      }
      break;
    case "listImg":
      if (action.payload.isTachie) {
        newState = { ...state };
      } else {
        newState = { ...state, listImg: !state.listImg };
      }
      break;
    case "directoryMode":
      newState = { ...state };
      break;
    default:
      throw new Error("不明なactionです");
  }

  if (action.payload.isTachie) {
    newState = { ...newState, character: !newState.character };
  }
  if (action.payload.isEffect) {
    newState = { ...newState, effect: !newState.effect };
  }
  if (action.payload.isReset) {
    newState = { ...newState, [action.type]: false };
  }
  return newState;
}

type ContextType = {
  rotateYState: rotateYType;
  rotateYDispatch: React.Dispatch<RotateYActionType>;
};

const RotateYContext = createContext({} as ContextType);

const RotateYProvider = ({ children }: { children: React.ReactNode }) => {
  const [rotateYState, rotateYDispatch] = useReducer(reducer, rotateYInit);

  return (
    <RotateYContext.Provider value={{ rotateYState, rotateYDispatch }}>
      {children}
    </RotateYContext.Provider>
  );
};

const useRotateY = () => {
  return useContext(RotateYContext);
};

export { RotateYProvider, useRotateY };
