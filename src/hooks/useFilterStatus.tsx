import { useState } from "react";
import { useFilter } from "../context/FilterContext";

type MessageType = {
  copy: "データ取得" | "取得成功";
  apply: "データ適応" | `「${number}番」適応` | "fetch失敗" | "リセット成功";
};

const useFilterStatus = () => {
  const { filterState, filterDispatch } = useFilter();

  const [message, setMessage] = useState<MessageType>({
    copy: "データ取得",
    apply: "データ適応",
  });
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [filterStatusNumber, setFilterStatusNumber] = useState<number>(0);

  const changeMessage = <T extends keyof MessageType>(
    target: T,
    text: MessageType[T],
    textRest: MessageType[T]
  ) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setMessage((prev) => ({
      ...prev,
      [target]: text,
    }));

    const timeout = setTimeout(() => {
      setMessage((prev) => ({
        ...prev,
        [target]: textRest,
      }));
    }, 1000);

    setTimeoutId(timeout);
  };

  const copyFilterStatus = () => {
    const filterDataJson = JSON.stringify(filterState);
    navigator.clipboard.writeText(filterDataJson);
    changeMessage("copy", "取得成功", "データ取得");
  };

  const applyFilterStatus = async () => {
    try {
      const response = await fetch("/filterData.json");
      const fetchData = await response.json();

      const setFilterData = (listNumber: number): void => {
        if (listNumber < fetchData.length) {
          setFilterStatusNumber((prev) => prev + 1);
          filterDispatch({
            type: "apply",
            payload: { effectData: 0, allEffect: fetchData[listNumber] },
          });
          changeMessage("apply", `「${listNumber}番」適応`, "データ適応");
        } else {
          setFilterStatusNumber(0);
          setFilterData(0);
        }
      };
      setFilterData(filterStatusNumber);
    } catch (error) {
      changeMessage("apply", "fetch失敗", "データ適応");
    }
  };

  const resetFilterStatus = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    filterDispatch({ type: "reset", payload: { effectData: 0 } });
    changeMessage("apply", "リセット成功", "データ適応");
  };

  return {
    message,
    copyFilterStatus,
    applyFilterStatus,
    resetFilterStatus,
  };
};

export { useFilterStatus };
