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
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // console.log("開始-x:", e.touches[0].clientX);
    setStartPoint({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    // console.log("終了-x:", e.changedTouches[0].clientX);
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const isNextByX = endX <= startPoint.x;
    const isNextByY = endY >= startPoint.y;

    switch (target) {
      case "card":
        if (endX === startPoint.x) return;
        setIsNext(isNextByX ? true : false);
        return mediaInfoDispatch({
          type: isNextByX ? "next" : "prev",
          payload: { scene: target, mediaActive },
        });
      case "cg":
        setIsNext(isNextByY ? true : false);
        return mediaInfoDispatch({
          type: isNextByY ? "next" : "prev",
          payload: { scene: target, mediaActive },
        });
      default:
        throw new Error("現在は決定されていません");
    }
  };

  return { handleTouchStart, handleTouchEnd };
};

export { useTouchNext };
