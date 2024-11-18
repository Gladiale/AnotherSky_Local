import { useState } from "react";
import { useMediaState } from "../context/MediaStateContext";
import type { MediaStateType } from "../types";

type ParamsType = {
  target: keyof Omit<MediaStateType, "touchMode">;
};

const useMediaTouchControl = ({ target }: ParamsType) => {
  const { mediaState, setMediaState } = useMediaState();
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // 最初のタッチポイントを取得
    const touch = e.touches[0];
    setStartPoint({
      x: touch.clientX,
      y: touch.clientY,
    });

    if (target === "effect" && mediaState.touchMode === "rotateMod") {
      setMediaState((prev) => ({
        ...prev,
        [target]: {
          ...prev[target],
          deg: prev[target].deg <= -1350 ? 0 : prev[target].deg - 90,
        },
      }));
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const transitionX = touch.clientX - startPoint.x;
    const transitionY = touch.clientY - startPoint.y;

    if (mediaState.touchMode === "positionMode") {
      setMediaState({
        ...mediaState,
        [target]: {
          ...mediaState[target],
          position: { x: transitionX, y: transitionY },
        },
      });
    }

    if (mediaState.touchMode === "scaleMode") {
      const stateScale = mediaState[target].scale;
      setMediaState({
        ...mediaState,
        [target]: {
          ...mediaState[target],
          scale:
            transitionY > 0
              ? Number((stateScale - 0.01).toFixed(2))
              : Number((stateScale + 0.01).toFixed(2)),
        },
      });
    }
  };

  return { handleTouchStart, handleTouchMove };
};

export { useMediaTouchControl };
