import { useState } from "react";

type ParamsType = {
  initialScale: number;
  isEffect: boolean;
};

const useImageControl = ({ initialScale, isEffect }: ParamsType) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [imageScale, setImageScale] = useState<number>(initialScale);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // 画像回転
  const [imageDeg, setImageDeg] = useState<number>(0);
  const changeImageDeg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditMode || !isEffect) {
      e.stopPropagation();
      if (imageDeg <= -1350) {
        setImageDeg(0);
      } else {
        setImageDeg((prev) => prev - 90);
      }
    }
  };

  // マウス最初の座標
  const [originPosition, setOriginPosition] = useState({ x: 0, y: 0 });
  const changeOriginPoint = (e: React.MouseEvent<HTMLDivElement> | React.WheelEvent) => {
    const targetData = e.currentTarget.getBoundingClientRect();
    // 現在のマウスの座標 (二回目以後はtransformによる偏移が発生するため、前回の偏移量を引くことで、transformの誤差を消す)
    setOriginPosition({
      x: targetData.x + targetData.width / 2 - imagePosition.x * imageScale,
      y: targetData.y + targetData.height / 2 - imagePosition.y * imageScale,
    });
  };

  const triggerEditMode = (e: React.MouseEvent<HTMLDivElement>, reset = false) => {
    if (reset) {
      e.stopPropagation();
      setIsEditMode(false);
      setImagePosition({ x: 0, y: 0 });
      setImageScale(initialScale);
      setImageDeg(0);
    }

    if (e.button === 1) {
      e.stopPropagation();
      setIsEditMode((prev) => !prev);
      if (!isEffect) {
        setImagePosition({ x: 0, y: 0 });
        setImageScale(initialScale);
      }
      if (!isEditMode && isEffect) {
        changeOriginPoint(e);
      }
    }
  };

  const changeImageScale = (e: React.WheelEvent) => {
    if (isEditMode) {
      // バブリングを阻止
      e.stopPropagation();
      if (e.deltaY > 0) {
        setImageScale((prev) => Number((prev - 0.1).toFixed(1)));
      } else {
        setImageScale((prev) => Number((prev + 0.1).toFixed(1)));
      }
    }
  };

  const moveImageReverse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditMode) {
      const maxMoveX =
        (e.currentTarget.clientWidth * imageScale - e.currentTarget.clientWidth) / 2;
      const maxMoveY =
        (e.currentTarget.clientHeight * imageScale - e.currentTarget.clientHeight) / 2;

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

      setImagePosition({
        // imageScaleを割ることで、移動倍率による問題を解消
        x: (positionX / imageScale) * 2,
        y: (positionY / imageScale) * 2,
      });
    }
  };

  const moveImageDirect = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditMode) {
      // マウスの移動距離
      // imageScaleによって、transformに必要な移動倍率も変わってしまうため、imageScaleを割ることで、その分の相応の移動倍率にすることができる
      setImagePosition({
        x: (e.clientX - originPosition.x) / imageScale,
        y: (e.clientY - originPosition.y) / imageScale,
      });
    }
  };

  return {
    isEditMode,
    imageDeg,
    imageScale,
    imagePosition,
    triggerEditMode,
    changeImageDeg,
    changeImageScale,
    moveImageReverse,
    moveImageDirect,
  };
};

export { useImageControl };
