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
    // ターゲットエレメントの中央座標を取得
    const targetData = e.currentTarget.getBoundingClientRect();
    setStartPoint({
      x:
        targetData.x +
        targetData.width / 2 -
        mediaState[target].position.x * mediaState[target].scale,
      y:
        targetData.y +
        targetData.height / 2 -
        mediaState[target].position.y * mediaState[target].scale,
    });

    if (target === "effect" && mediaState.touchMode === "rotateMod") {
      const stateDeg = mediaState[target]["deg"];
      const newDeg = stateDeg <= -1350 || stateDeg >= 1350 ? 0 : stateDeg - 90;

      setMediaState({
        ...mediaState,
        [target]: {
          ...mediaState[target],
          deg: newDeg,
        },
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const mediaScale = mediaState[target].scale;
    const transitionX = (touch.clientX - startPoint.x) / mediaScale;
    const transitionY = (touch.clientY - startPoint.y) / mediaScale;

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
