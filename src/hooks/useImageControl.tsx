import { useState } from "react";

const useImageControl = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [imageScale, setImageScale] = useState<number>(1);
  const [imagePosition, setImagePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const triggerEditMode = (e: React.MouseEvent<HTMLDivElement>, scale: number) => {
    if (e.button === 1) {
      e.stopPropagation();
      setIsEditMode((prev) => !prev);
      setImagePosition({
        x: 0,
        y: 0,
      });
      setImageScale(scale);
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
      const positionX: number = e.nativeEvent.layerX;
      const positionY: number = e.nativeEvent.layerY;

      setImagePosition({
        x: positionX,
        y: positionY,
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
