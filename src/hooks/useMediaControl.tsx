import { useState } from "react";
import { mediaStateInit, useMediaState } from "../context/MediaStateContext";
import type { MediaStateType } from "../types";

type ParamsType = {
  initialScale: number;
  target: keyof Omit<MediaStateType, "touchMode">;
};

const useMediaControl = ({ initialScale, target }: ParamsType) => {
  const { mediaState, setMediaState } = useMediaState();

  // マウス最初の座標
  const [originPosition, setOriginPosition] = useState({ x: 0, y: 0 });
  const changeOriginPoint = (e: React.MouseEvent<HTMLDivElement> | React.WheelEvent) => {
    const targetData = e.currentTarget.getBoundingClientRect();
    // 現在のマウスの座標 (二回目以後はtransformによる偏移が発生するため、前回の偏移量を引くことで、transformの誤差を消す)
    setOriginPosition({
      x:
        targetData.x +
        targetData.width / 2 -
        mediaState[target].position.x * mediaState[target].scale,
      y:
        targetData.y +
        targetData.height / 2 -
        mediaState[target].position.y * mediaState[target].scale,
    });
  };

  // 画像回転
  const changeMediaDeg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mediaState[target].isEditMode || target !== "effect") {
      e.stopPropagation();
      const stateDeg = mediaState[target]["deg"];
      setMediaState({
        ...mediaState,
        [target]: {
          ...mediaState[target],
          deg: stateDeg <= -1350 ? 0 : stateDeg - 90,
        },
      });
    }
  };

  const triggerEditMode = (e: React.MouseEvent<HTMLDivElement>, reset = false) => {
    if (reset) {
      e.stopPropagation();
      return setMediaState({
        ...mediaState,
        image: {
          ...mediaState["image"],
          isEditMode: false,
        },
        effect: {
          ...mediaState["effect"],
          isEditMode: false,
        },
        video: {
          ...mediaState["video"],
          isEditMode: false,
        },
        [target]: {
          ...mediaStateInit[target],
        },
      });
    }

    if (e.button === 1) {
      e.stopPropagation();

      if (!mediaState[target].isEditMode && target === "effect") {
        changeOriginPoint(e);
      }

      if (target !== "effect") {
        return setMediaState({
          ...mediaState,
          [target]: {
            ...mediaStateInit[target],
            scale: mediaState[target].isEditMode
              ? mediaStateInit[target].scale
              : initialScale,
            deg: mediaState[target].deg,
            isEditMode: !mediaState[target].isEditMode,
          },
        });
      }

      if (target === "effect") {
        return setMediaState({
          ...mediaState,
          [target]: {
            ...mediaState[target],
            isEditMode: !mediaState[target].isEditMode,
          },
        });
      }
    }
  };

  const changeMediaScale = (e: React.WheelEvent) => {
    if (mediaState[target].isEditMode) {
      // バブリングを阻止
      e.stopPropagation();
      const stateScale = mediaState[target].scale;
      setMediaState({
        ...mediaState,
        [target]: {
          ...mediaState[target],
          scale:
            e.deltaY > 0
              ? Number((stateScale - 0.1).toFixed(1))
              : Number((stateScale + 0.1).toFixed(1)),
        },
      });
    }
  };

  const moveMediaReverse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mediaState[target].isEditMode) {
      const mediaScale = mediaState[target].scale;

      const maxMoveX =
        (e.currentTarget.clientWidth * mediaScale - e.currentTarget.clientWidth) / 2;
      const maxMoveY =
        (e.currentTarget.clientHeight * mediaScale - e.currentTarget.clientHeight) / 2;

      const positionX: number =
        -(
          Math.floor(e.nativeEvent.layerX - e.currentTarget.clientWidth / 2) /
          e.currentTarget.clientWidth
        ) * maxMoveX;
      const positionY: number =
        -(
          Math.floor(e.nativeEvent.layerY - e.currentTarget.clientHeight / 2) /
          e.currentTarget.clientHeight
        ) * maxMoveY;

      const newPosition = {
        // imageScaleを割ることで、移動倍率による問題を解消
        x: (positionX / mediaScale) * 2,
        y: (positionY / mediaScale) * 2,
      };

      setMediaState({
        ...mediaState,
        [target]: {
          ...mediaState[target],
          position: newPosition,
        },
      });
    }
  };

  const moveMediaDirect = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mediaState[target].isEditMode) {
      const mediaScale = mediaState[target].scale;
      // マウスの移動距離
      // imageScaleによって、transformに必要な移動倍率も変わってしまうため、imageScaleを割ることで、その分の相応の移動倍率にすることができる
      const newPosition = {
        x: (e.clientX - originPosition.x) / mediaScale,
        y: (e.clientY - originPosition.y) / mediaScale,
      };

      setMediaState({
        ...mediaState,
        [target]: {
          ...mediaState[target],
          position: newPosition,
        },
      });
    }
  };

  return {
    triggerEditMode,
    changeMediaDeg,
    changeMediaScale,
    moveMediaReverse,
    moveMediaDirect,
  };
};

export { useMediaControl };
