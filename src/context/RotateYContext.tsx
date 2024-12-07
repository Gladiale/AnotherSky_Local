import { createContext, useContext, useReducer } from "react";
import { type SceneType } from "./SceneContext";

type rotateYType = {
  cardRotateY: boolean;
  cgRotateY: boolean;
  videoRotateY: boolean;
  listImgRotateY: boolean;
  standImgRotateY: boolean;
  effectRotateY: boolean;
};

const rotateYInit = {
  cardRotateY: false,
  cgRotateY: false,
  videoRotateY: false,
  listImgRotateY: false,
  standImgRotateY: false,
  effectRotateY: false,
};

type rotateYActionType = {
  type: SceneType;
  payload: { isTachie: boolean; isEffect: boolean };
};

function reducer(state: rotateYType, action: rotateYActionType) {
  let newState: rotateYType;

  switch (action.type) {
    case "card":
      newState = { ...state, cardRotateY: !state.cardRotateY };
      break;
    case "cg":
      if (action.payload.isTachie || action.payload.isEffect) {
        newState = { ...state };
      } else {
        newState = { ...state, cgRotateY: !state.cgRotateY };
      }
      break;
    case "anotherCharacter":
      if (action.payload.isTachie || action.payload.isEffect) {
        newState = { ...state };
      } else {
        newState = { ...state, cgRotateY: !state.cgRotateY };
      }
      break;
    case "video":
      if (action.payload.isTachie || action.payload.isEffect) {
        newState = { ...state };
      } else {
        newState = { ...state, videoRotateY: !state.videoRotateY };
      }
      break;
    case "listImg":
      if (action.payload.isTachie) {
        newState = { ...state };
      } else {
        newState = { ...state, listImgRotateY: !state.listImgRotateY };
      }
      break;
    case "directoryMode":
      newState = state;
      break;
    case "flipBook":
      newState = state;
      break;
    default:
      throw new Error("不明なactionです");
  }

  if (action.payload.isTachie) {
    newState = { ...newState, standImgRotateY: !newState.standImgRotateY };
  }
  if (action.payload.isEffect) {
    newState = { ...newState, effectRotateY: !newState.effectRotateY };
  }
  return newState;
}

type ContextType = {
  rotateYState: rotateYType;
  rotateYDispatch: React.Dispatch<rotateYActionType>;
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
