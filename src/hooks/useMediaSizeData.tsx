import { useMediaSize, useScreenMode } from "../context/ScreenContext";
import { useWindowState } from "./useWindowState";

const useMediaSizeData = () => {
  const { mediaSize } = useMediaSize();
  const { screenMode } = useScreenMode();
  const { isMobileSize } = useWindowState();

  const mediaSizeData = {
    objectFit: mediaSize === "custom" ? "contain" : mediaSize,
    height:
      mediaSize === "contain"
        ? "100%"
        : isMobileSize && mediaSize === "custom"
        ? "100dvw"
        : "auto",
    width: "auto",
    maxHeight:
      mediaSize === "custom" ? "100%" : mediaSize === "contain" ? "100dvh" : undefined,
    maxWidth:
      mediaSize === "custom" && !isMobileSize
        ? "65dvw"
        : mediaSize === "custom" && isMobileSize && screenMode === "cardMode"
        ? "90dvw"
        : mediaSize === "contain"
        ? "100dvw"
        : undefined,
  };

  return { mediaSizeData };
};

export { useMediaSizeData };
