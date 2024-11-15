import { useLayoutEffect, useState } from "react";
import { useAppOption } from "../context/AppOptionContext";

type ParamsType = {
  trigger: any[];
  target: "cg" | "character" | "video" | "effect";
};

const useLoading = ({ trigger, target }: ParamsType) => {
  const { optionData } = useAppOption();
  const [loadStatus, setLoadStatus] = useState<"wait" | "success" | "failed">(
    optionData.loadingAnime ? "wait" : "success"
  );

  const loadingTime = {
    delay: {
      cg: 500,
      character: 300,
      video: 700,
      effect: 200,
    },
  };

  useLayoutEffect(() => {
    if (optionData.loadingAnime) {
      setLoadStatus("wait");
    }
    if (!optionData.loadingAnime && loadStatus === "failed") {
      setLoadStatus("success");
    }
  }, [...trigger]);

  const showTarget = () => {
    if (optionData.loadingAnime) {
      setTimeout(() => {
        setLoadStatus("success");
      }, loadingTime.delay[target]);
    }
  };

  // 読み込み失敗の時
  const showError = () => {
    if (optionData.loadingAnime) {
      setLoadStatus("failed");
    }
  };

  return { loadStatus, showTarget, showError };
};

export default useLoading;
