import { useMediaSize, useScreenMode } from "../context/ScreenContext";
import { useWindowSize } from "./useWindowSize";

const useMediaSizeData = () => {
  const { mediaSize } = useMediaSize();
  const { screenMode } = useScreenMode();
  const [windowWidth] = useWindowSize();

  const mediaSizeData = {
    objectFit: mediaSize === "custom" ? "contain" : mediaSize,
    height:
      mediaSize === "contain"
        ? "100%"
        : windowWidth <= 768 && mediaSize === "custom"
        ? "100dvw"
        : "auto",
    width: windowWidth <= 768 && mediaSize === "contain" ? "100dvw" : "auto",
    maxHeight: mediaSize === "custom" ? "100dvh" : undefined,
    maxWidth:
      mediaSize === "custom" && windowWidth > 768
        ? "65dvw"
        : mediaSize === "custom" && windowWidth <= 768 && screenMode === "cardMode"
        ? "90dvw"
        : undefined,
  };

  return { mediaSizeData };
};

export { useMediaSizeData };
