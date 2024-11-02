import { useState } from "react";

const useImageControl = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [imageScale, setImageScale] = useState<number>(1);
  const [imagePosition, setImagePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // マウス最初の座標
  const [originPosition, setOriginPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const triggerEditMode = (
    e: React.MouseEvent<HTMLDivElement>,
    initialScale: number,
    isEffect = false
  ) => {
    if (e.button === 1) {
      e.stopPropagation();
      // 現在のマウスの座標
      setOriginPosition({ x: e.clientX, y: e.clientY });
      setIsEditMode((prev) => !prev);
      if (!isEffect) {
        setImagePosition({
          x: 0,
          y: 0,
        });
        setImageScale(initialScale);
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
        x: positionX,
        y: positionY,
      });
    }
  };

  const moveImageDirect = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditMode) {
      // マウスの移動距離
      setImagePosition({
        x: e.clientX - originPosition.x,
        y: e.clientY - originPosition.y,
      });
    }
  };

  return {
    isEditMode,
    setIsEditMode,
    imageScale,
    imagePosition,
    triggerEditMode,
    changeImageScale,
    moveImageReverse,
    moveImageDirect,
  };
};

export { useImageControl };
