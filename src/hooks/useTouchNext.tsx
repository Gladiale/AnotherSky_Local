import { useState } from "react";
import {
  useMediaActive,
  useMediaInfo,
} from "../context/MediaInfoContext/MediaInfoContext";
import { useDirection } from "../context/OtherContext";
import { type SceneType } from "../context/SceneContext";

const useTouchNext = (target: SceneType) => {
  const { setIsNext } = useDirection();
  const { mediaActive } = useMediaActive();
  const { mediaInfoDispatch } = useMediaInfo();
  const [startX, setStartX] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // console.log("開始-x:", e.touches[0].clientX);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    // console.log("終了-x:", e.changedTouches[0].clientX);
    const endX = e.changedTouches[0].clientX;
    setIsNext(endX >= startX ? true : false);
    mediaInfoDispatch({
      type: endX >= startX ? "next" : "prev",
      payload: { scene: target, mediaActive },
    });
  };

  return { handleTouchStart, handleTouchEnd };
};

export { useTouchNext };
