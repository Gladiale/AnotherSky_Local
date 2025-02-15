import { useState } from "react";
import { useFilter } from "../context/FilterContext";
import type { FilterDataType } from "../types";

type ApiMessageType =
  | "リセット"
  | "リセット成功"
  | "未実行"
  | "fetch失敗"
  | `「${number}番」適応`
  | `「${number}番」更新成功`
  | "データ更新失敗"
  | `「${number}番」追加成功`
  | "データ追加失敗"
  | `「${number}番」削除成功`
  | "データ削除失敗";

const useFilterApi = () => {
  const { filterState, filterDispatch } = useFilter();
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [message, setMessage] = useState<ApiMessageType>("リセット");
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(undefined);

  const changeMessage = (text: ApiMessageType) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setMessage(text);

    const timeout = setTimeout(() => {
      setMessage("リセット");
    }, 1000);
    setTimeoutId(timeout);
  };

  const applyFilterStatus = async (key: "next" | "prev" | "reset") => {
    try {
      const response = await fetch("/filterData.json");
      if (!response.ok) {
        return changeMessage("fetch失敗");
      }
      const fetchData = await response.json();

      const setFilterData = (
        index: number | undefined,
        key: "next" | "prev" | "reset"
      ): void => {
        if (key === "reset") {
          filterDispatch({ type: "reset", payload: { effectData: 0 } });
          return changeMessage("リセット成功");
        }

        if (index === undefined) {
          setCurrentIndex(0);
          changeMessage(`「0番」適応`);
          return filterDispatch({
            type: "apply",
            payload: { effectData: 0, allEffect: fetchData[0] },
          });
        }

        if (key === "next") {
          const nextIndex = (index + 1) % fetchData.length;
          setCurrentIndex(nextIndex);
          changeMessage(`「${nextIndex}番」適応`);
          return filterDispatch({
            type: "apply",
            payload: { effectData: 0, allEffect: fetchData[nextIndex] },
          });
        }

        if (key === "prev") {
          const prevIndex = (index - 1 + fetchData.length) % fetchData.length;
          setCurrentIndex(prevIndex);
          changeMessage(`「${prevIndex}番」適応`);
          return filterDispatch({
            type: "apply",
            payload: { effectData: 0, allEffect: fetchData[prevIndex] },
          });
        }
      };

      setFilterData(currentIndex, key);
    } catch (error) {
      changeMessage("fetch失敗");
    }
  };

  const handlePost = async () => {
    if (currentIndex === undefined) {
      return changeMessage("未実行");
    }

    try {
      const response = await fetch("/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterState),
      });
      if (!response.ok) {
        return changeMessage("データ追加失敗");
      }
      const responseData = (await response.json()) as FilterDataType[];
      changeMessage(`「${responseData.length}番」追加成功`);
    } catch {
      changeMessage("データ追加失敗");
    }
  };

  const handleUpdate = async () => {
    if (currentIndex === undefined) {
      return changeMessage("未実行");
    }

    try {
      const response = await fetch(`/api/filter/${currentIndex}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterState),
      });
      if (!response.ok) {
        return changeMessage("データ更新失敗");
      }
      changeMessage(`「${currentIndex}番」更新成功`);
    } catch {
      changeMessage("データ更新失敗");
    }
  };

  const handleDelete = async () => {
    if (currentIndex === undefined) {
      return changeMessage("未実行");
    }

    try {
      const response = await fetch(`/api/filter/${currentIndex}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        return changeMessage("データ削除失敗");
      }
      applyFilterStatus("prev");
      changeMessage(`「${currentIndex}番」削除成功`);
    } catch {
      changeMessage("データ削除失敗");
    }
  };

  return {
    message,
    applyFilterStatus,
    handlePost,
    handleUpdate,
    handleDelete,
  };
};

export { useFilterApi };
