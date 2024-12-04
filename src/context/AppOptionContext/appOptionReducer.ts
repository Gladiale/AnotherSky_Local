import { type AppOptionType } from "./appOptionInit";

type RestoreActionType = {
  type: "restore";
  payload: AppOptionType;
};

type BasicActionType = {
  type: "basic";
  payload: keyof Omit<AppOptionType, "lastingAnime" | "dropShadow">;
};

type LastingAnimeActionType = {
  type: "lastingAnime";
  payload: keyof AppOptionType["lastingAnime"];
};

type DropShadowActionType = {
  type: "dropShadow";
  payload: keyof AppOptionType["dropShadow"];
};

type AppOptionActionType =
  | RestoreActionType
  | BasicActionType
  | LastingAnimeActionType
  | DropShadowActionType;

const appOptionReducer = (
  state: AppOptionType,
  action: AppOptionActionType
): AppOptionType => {
  switch (action.type) {
    case "basic":
      return { ...state, [action.payload]: !state[action.payload] };
    case "lastingAnime":
      return {
        ...state,
        lastingAnime: {
          ...state["lastingAnime"],
          [action.payload]: !state["lastingAnime"][action.payload],
        },
      };
    case "dropShadow":
      return {
        ...state,
        dropShadow: {
          ...state["dropShadow"],
          [action.payload]: !state["dropShadow"][action.payload],
        },
      };
    case "restore":
      return { ...action.payload };
    default:
      throw new Error("不明なActionです");
  }
};

export { appOptionReducer, type AppOptionActionType };
