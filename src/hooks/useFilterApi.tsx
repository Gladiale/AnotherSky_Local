import { useState } from "react";
import { useFilter } from "../context/FilterContext";
import { FilterDataType } from "../types";

type ApiMessageType =
  | "Reset"
  | "リセット成功"
  | "Lost Index"
  | "既存データありません"
  | "Fetch失敗"
  | "Response Error"
  | `「${number}番」適応`
  | `${number}番-更新成功`
  | "データ更新失敗"
  | `${number}番-追加成功`
  | "データ追加失敗"
  | `${number}番-削除成功`
  | "データ削除失敗"
  | "これ以上削除不可";

const useFilterApi = () => {
  const { filterState, filterDispatch } = useFilter();
  const [filterData, setFilterData] = useState<FilterDataType[] | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [message, setMessage] = useState<ApiMessageType>("Reset");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const changeMessage = (text: ApiMessageType) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setMessage(text);

    const timeout = setTimeout(() => {
      setMessage("Reset");
    }, 1000);
    setTimeoutId(timeout);
  };

  const changeFilterState = (
    dataList: FilterDataType[],
    index: number | null,
    key: "next" | "prev" | "reset"
  ): void => {
    if (key === "reset") {
      filterDispatch({ type: "reset", payload: { effectData: 0 } });
      return changeMessage("リセット成功");
    }

    if (index === null) {
      setCurrentIndex(0);
      changeMessage(`「0番」適応`);
      return filterDispatch({
        type: "apply",
        payload: { effectData: 0, allEffect: dataList[0] },
      });
    }

    if (key === "next") {
      const nextIndex = (index + 1) % dataList.length;
      setCurrentIndex(nextIndex);
      changeMessage(`「${nextIndex}番」適応`);
      return filterDispatch({
        type: "apply",
        payload: { effectData: 0, allEffect: dataList[nextIndex] },
      });
    }

    if (key === "prev") {
      const prevIndex = (index - 1 + dataList.length) % dataList.length;
      setCurrentIndex(prevIndex);
      changeMessage(`「${prevIndex}番」適応`);
      return filterDispatch({
        type: "apply",
        payload: { effectData: 0, allEffect: dataList[prevIndex] },
      });
    }
  };

  const applyFilterStatus = async (key: "next" | "prev" | "reset") => {
    if (filterData === null) {
      try {
        const response = await fetch("/filterData.json");
        if (!response.ok) {
          return changeMessage("Response Error");
        }
        const fetchData = (await response.json()) as FilterDataType[];
        if (fetchData.length === 0) {
          return changeMessage("既存データありません");
        }
        setFilterData(() => fetchData);
        changeFilterState(fetchData, currentIndex, key);
      } catch (error) {
        changeMessage("Fetch失敗");
      }
    } else {
      changeFilterState(filterData, currentIndex, key);
    }
  };

  const handlePost = async () => {
    try {
      const response = await fetch("/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterState),
      });
      if (!response.ok) {
        return changeMessage("Response Error");
      }
      const responseData = (await response.json()) as FilterDataType[];
      setFilterData(responseData);
      changeMessage(`${responseData.length - 1}番-追加成功`);
    } catch {
      changeMessage("データ追加失敗");
    }
  };

  const handleUpdate = async () => {
    if (currentIndex === null) {
      return changeMessage("Lost Index");
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
        return changeMessage("Response Error");
      }
      const responseData = (await response.json()) as FilterDataType[];
      setFilterData(responseData);
      changeMessage(`${currentIndex}番-更新成功`);
    } catch {
      changeMessage("データ更新失敗");
    }
  };

  const handleDelete = async () => {
    if (currentIndex === null) {
      return changeMessage("Lost Index");
    }

    if (filterData?.length === 1) {
      return changeMessage("これ以上削除不可");
    }

    try {
      const response = await fetch(`/api/filter/${currentIndex}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        return changeMessage("Response Error");
      }
      const responseData = (await response.json()) as FilterDataType[];
      setFilterData(responseData);
      setCurrentIndex(currentIndex === 0 ? 0 : currentIndex - 1);
      changeMessage(`${currentIndex}番-削除成功`);
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
