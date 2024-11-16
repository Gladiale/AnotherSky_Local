import { createContext, useContext, useLayoutEffect, useState } from "react";
import type { AppOptionDataType } from "../types";

const optionInit: AppOptionDataType = {
  loadingAnime: true,
  cgSwing: true,
  cgShadow: true,
  videoShadow: true,
  characterShadow: false,
  iconShadow: true,
};

type AppOptionContextType = {
  optionData: AppOptionDataType;
  saveStorageData: () => void;
  changeOptionData: (key: keyof AppOptionDataType) => void;
};

const AppOptionContext = createContext({} as AppOptionContextType);

const AppOptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [optionData, setOptionData] = useState<AppOptionDataType>(optionInit);
  const storageKey = "appOption";

  useLayoutEffect(() => {
    const getOptionData = () => {
      const originData = window.localStorage.getItem(storageKey);
      if (originData === null) {
        saveStorageData();
      } else {
        // JSON.parse()メソッドを使用して、相応の値に戻します
        const dataSerialized: AppOptionDataType = JSON.parse(originData);
        setOptionData(dataSerialized);
      }
    };

    window.addEventListener("load", getOptionData);
    return () => {
      window.removeEventListener("load", getOptionData);
    };
  }, []);

  const saveStorageData = () => {
    const stringData = JSON.stringify(optionData);
    window.localStorage.setItem(storageKey, stringData);
  };

  const changeOptionData = (key: keyof AppOptionDataType): void => {
    setOptionData({ ...optionData, [key]: !optionData[key] });
  };

  return (
    <AppOptionContext.Provider value={{ optionData, saveStorageData, changeOptionData }}>
      {children}
    </AppOptionContext.Provider>
  );
};

const useAppOption = () => {
  return useContext(AppOptionContext);
};

export { AppOptionProvider, useAppOption };
