import { useMediaSize, useScreenMode } from "../context/ScreenContext";
import { useWindowState } from "./useWindowState";

const useMediaSizeData = () => {
  const { mediaSize } = useMediaSize();
  const { screenMode } = useScreenMode();
  const { isMobile } = useWindowState();

  const mediaSizeData = {
    objectFit: mediaSize === "custom" ? "contain" : mediaSize,
    height:
      mediaSize === "contain"
        ? "100%"
        : isMobile && mediaSize === "custom"
        ? "100dvw"
        : "auto",
    width: isMobile && mediaSize === "contain" ? "100dvw" : "auto",
    maxHeight: mediaSize === "custom" ? "100%" : undefined,
    maxWidth:
      mediaSize === "custom" && !isMobile
        ? "65dvw"
        : mediaSize === "custom" && isMobile && screenMode === "cardMode"
        ? "90dvw"
        : undefined,
  };

  return { mediaSizeData };
};

export { useMediaSizeData };
