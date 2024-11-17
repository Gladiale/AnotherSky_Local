import styles from "./Container.module.css";
import { useLayoutEffect } from "react";

import Content from "../Content/Content";
import Control from "../Control/Control";
import Information from "../Information/Information";
import { HoverProvider } from "../../context/HoverContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { FilterProvider } from "../../context/FilterContext";
import { useScreenMode } from "../../context/ScreenContext";
import { ImageListProvider } from "../../context/ImageListState";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { RotateYProvider } from "../../context/RotateYContext";
import { MediaStateProvider } from "../../context/MediaStateContext";

const Container = () => {
  const { mediaInfo, mediaInfoDispatch } = useMediaInfo();
  const { screenMode } = useScreenMode();
  const { effectState } = useEffectState();

  useLayoutEffect(() => {
    if (mediaInfo.file.character[1] === "") {
      mediaInfoDispatch({ type: "random" });
    }
  }, []);

  return (
    <div
      className={`${styles.container}
      ${effectState.mirrorEffect && styles.mirror}
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
