import styles from "./Container.module.css";
import { useLayoutEffect } from "react";

import Content from "../Content/Content";
import Control from "../Control/Control";
import Information from "../Information/Information";
import { HoverProvider } from "../../context/HoverContext";
import { FilterProvider } from "../../context/FilterContext";
import { useScreenMode } from "../../context/ScreenContext";
import { RotateYProvider } from "../../context/RotateYContext";
import { ImageListProvider } from "../../context/ImageListState";
import { MediaStateProvider } from "../../context/MediaStateContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";

const Container = () => {
  const { screenMode } = useScreenMode();
  const { mediaInfo, mediaInfoDispatch } = useMediaInfo();

  useLayoutEffect(() => {
    if (mediaInfo.file.character[1] === "") {
      mediaInfoDispatch({ type: "random" });
    }
  }, []);

  return (
    <div
      className={`${styles.container}
      ${screenMode === "cardMode" && styles.cardMode}
      ${screenMode === "cgMode" && styles.cgMode}`}
    >
      <FilterProvider>
        <RotateYProvider>
          <HoverProvider>
            <ImageListProvider>
              <MediaStateProvider>
                <Content />
                <Control />
                <Information />
              </MediaStateProvider>
            </ImageListProvider>
          </HoverProvider>
        </RotateYProvider>
      </FilterProvider>
    </div>
  );
};

export default Container;
