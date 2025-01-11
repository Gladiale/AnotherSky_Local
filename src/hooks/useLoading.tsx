import { useLayoutEffect, useState } from "react";
import { useAppOption } from "../context/AppOptionContext/AppOptionContext";

type ParamsType = {
  trigger: any[];
};

const useLoading = ({ trigger }: ParamsType) => {
  const { appOption } = useAppOption();
  const [loadStatus, setLoadStatus] = useState<"waiting" | "success" | "failed">(
    appOption.loadingAnime ? "waiting" : "success"
  );

  const loadingTime = {
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
    return () => clearTimeout(timeoutId);
  }, [...trigger]);

  const showTarget = () => {
    if (appOption.loadingAnime) {
      setLoadStatus("success");
    }
  };

  return { loadStatus, showTarget };
};

export { useLoading };
