import { useState } from "react";
import { mediaStateInit, useMediaState } from "../context/MediaStateContext";
import type { MediaStateType } from "../types";

const fixRotateDirection = (e: React.MouseEvent<HTMLDivElement>, prevDeg: number) => {
  let rotateDeg: number;

  // *** windowの左右を基準に回転方向を決め ***
  const mouseXatWindow = e.clientX;
  const windowWidth = window.innerWidth;

  if (prevDeg <= -1350 || prevDeg >= 1350) {
    rotateDeg = 0;
  } else {
    rotateDeg = mouseXatWindow <= windowWidth / 2 ? prevDeg - 90 : prevDeg + 90;
  }

  /*
  // *** ターゲットのエレメントの左右を基準に回転方向を決め ***
  // ターゲットのサーズ [width, height]
  const targetSize = [e.currentTarget.offsetWidth, e.currentTarget.offsetHeight];
  // ターゲット上のマウスの座標 [x, y]
  const mouseAtTarget = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];

  const angle1st = [0, 360, 720, 1080];
  const angle2nd = angle1st.map((item) => item + 90);
  const angle3rd = angle1st.map((item) => item + 180);
  const angle4th = angle1st.map((item) => item + 270);

  const prevDegAbs = Math.abs(prevDeg);
  switch (true) {
    case angle1st.includes(prevDegAbs):
      rotateDeg = mouseAtTarget[0] <= targetSize[0] / 2 ? prevDeg - 90 : prevDeg + 90;
      break;
    case angle3rd.includes(prevDegAbs):
      rotateDeg = mouseAtTarget[0] >= targetSize[0] / 2 ? prevDeg - 90 : prevDeg + 90;
      break;
    case angle2nd.includes(prevDegAbs):
      if (prevDeg < 0) {
        rotateDeg = mouseAtTarget[1] <= targetSize[1] / 2 ? prevDeg - 90 : prevDeg + 90;
      } else {
        rotateDeg = mouseAtTarget[1] <= targetSize[1] / 2 ? prevDeg + 90 : prevDeg - 90;
      }
      break;
    case angle4th.includes(prevDegAbs):
      if (prevDeg < 0) {
        rotateDeg = mouseAtTarget[1] >= targetSize[1] / 2 ? prevDeg - 90 : prevDeg + 90;
      } else {
        rotateDeg = mouseAtTarget[1] >= targetSize[1] / 2 ? prevDeg + 90 : prevDeg - 90;
      }
      break;
    default:
      rotateDeg = 0;
      break;
  }
  */

  return rotateDeg;
};

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
    // ターゲットエレメントの中央座標を取得 (二回目以後はtransformによる偏移が発生するため、前回の偏移量を引くことで、transformの誤差を消す)
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
      let newDeg: number;

      if (target === "effect") {
        newDeg = stateDeg <= -1350 ? 0 : stateDeg - 90;
      } else {
        newDeg = fixRotateDirection(e, stateDeg);
      }

      setMediaState({
        ...mediaState,
        [target]: {
          ...mediaState[target],
          deg: newDeg,
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
