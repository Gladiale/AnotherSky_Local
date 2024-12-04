import { useLayoutEffect, useState } from "react";
import { useAppOption } from "../context/AppOptionContext/AppOptionContext";

type ParamsType = {
  trigger: any[];
  target: "cg" | "character" | "video" | "effect";
};

const useLoading = ({ trigger, target }: ParamsType) => {
  const { appOption } = useAppOption();
  const [loadStatus, setLoadStatus] = useState<"waiting" | "success" | "failed">(
    appOption.loadingAnime ? "waiting" : "success"
  );

  const loadingTime = {
    delay: {
      cg: 500,
      character: 300,
      video: 700,
      effect: 200,
    },
    failed: 7000,
  };

  useLayoutEffect(() => {
    let timeoutId: number;
    if (appOption.loadingAnime) {
      setLoadStatus("waiting");
      timeoutId = setTimeout(() => {
        setLoadStatus((prevStatus) => (prevStatus === "waiting" ? "failed" : prevStatus));
      }, loadingTime.failed);
    }

    if (!appOption.loadingAnime && loadStatus === "failed") {
      setLoadStatus("success");
    }
    return () => clearTimeout(timeoutId);
  }, [...trigger]);

  const showTarget = () => {
    if (appOption.loadingAnime) {
      setTimeout(() => {
        setLoadStatus("success");
      }, loadingTime.delay[target]);
    }
  };

  // 読み込み失敗の時
  const showError = () => {
    if (appOption.loadingAnime) {
      setLoadStatus("failed");
    }
  };

  return { loadStatus, showTarget, showError };
};

export { useLoading };
