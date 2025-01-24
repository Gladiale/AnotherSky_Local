import { useState } from "react";

const useClickPosition = () => {
  const [clickPosition, setClickPosition] = useState<"left" | "right" | undefined>(
    undefined
  );

  const handleClickPosition = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    const clientWidth = e.currentTarget.clientWidth;
    const offsetX = e.nativeEvent.offsetX;

    if (offsetX <= clientWidth / 2) {
      setClickPosition("left");
    } else {
      setClickPosition("right");
    }
  };

  return { clickPosition, handleClickPosition };
};

export { useClickPosition };
