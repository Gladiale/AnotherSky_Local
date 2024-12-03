import { useState } from "react";

const useTransform3d = () => {
  const [transform3d, setTransform3d] = useState<string | undefined>(undefined);

  const changeTransform3d = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLVideoElement>
  ) => {
    // ターゲットのサーズ (半分のサーズ) [width, height]
    const targetSize = [
      e.currentTarget.offsetWidth / 2,
      e.currentTarget.offsetHeight / 2,
    ];
    // ターゲット上のマウスの座標 [x, y]
    const mouseAtTarget = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];

    const percentageX = Math.abs(targetSize[0] - mouseAtTarget[0]) / targetSize[0];
    const percentageY = Math.abs(mouseAtTarget[1] - targetSize[1]) / targetSize[1];

    // const x = mouseAtTarget[1] < targetSize[1] ? 1 : -1;
    // const y = mouseAtTarget[0] < targetSize[0] ? -1 : 1;
    const x = mouseAtTarget[1] < targetSize[1] ? percentageY : -percentageY;
    const y = mouseAtTarget[0] < targetSize[0] ? -percentageX : percentageX;
    const z = 0;

    const angle =
      percentageX < 0.1 && percentageY < 0.1
        ? "5deg"
        : percentageX < 0.35 && percentageY < 0.35
        ? "10deg"
        : percentageX < 0.6 && percentageY < 0.6
        ? "15deg"
        : percentageX < 0.85 && percentageY < 0.85
        ? "20deg"
        : "25deg";

    const translateZ = "100px";

    setTransform3d(
      `perspective(950px) translateZ(${translateZ}) rotate3d(${x}, ${y}, ${z}, ${angle})`
    );
  };

  const resetTransform3d = () => {
    setTransform3d(undefined);
  };

  return { transform3d, changeTransform3d, resetTransform3d };
};

export { useTransform3d };
