import { createContext, useContext, useLayoutEffect, useReducer } from "react";
import { type AppOptionType, appOptionInit } from "./appOptionInit";
import { type AppOptionActionType, appOptionReducer } from "./appOptionReducer";

type AppOptionContextType = {
  appOption: AppOptionType;
  appOptionDispatch: React.Dispatch<AppOptionActionType>;
  saveStorageData: () => void;
};

const AppOptionContext = createContext({} as AppOptionContextType);

const AppOptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [appOption, appOptionDispatch] = useReducer(appOptionReducer, appOptionInit);
  const storageKey = "appOption";

  useLayoutEffect(() => {
    const getOptionData = () => {
      const originData = window.localStorage.getItem(storageKey);
      if (originData === null) {
        saveStorageData();
      } else {
        // JSON.parse()メソッドを使用して、相応の値に戻します
        const dataSerialized: AppOptionType = JSON.parse(originData);
        appOptionDispatch({ type: "restore", payload: dataSerialized });
      }
    };

    window.addEventListener("load", getOptionData);
    return () => {
      window.removeEventListener("load", getOptionData);
    };
  }, []);

  const saveStorageData = () => {
    const stringData = JSON.stringify(appOption);
    window.localStorage.setItem(storageKey, stringData);
  };

  return (
    <AppOptionContext.Provider
      value={{
        appOption,
        appOptionDispatch,
        saveStorageData,
      }}
    >
      {children}
    </AppOptionContext.Provider>
  );
};

const useAppOption = () => {
  return useContext(AppOptionContext);
};

export { AppOptionProvider, useAppOption };
