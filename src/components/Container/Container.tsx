import styles from "./Container.module.css";
import { useLayoutEffect } from "react";

import Content from "../Content/Content";
import Control from "../Control/Control";
import ThreeControl from "../ThreeBox/ThreeControl";
import Information from "../Information/Information";
import { HoverProvider } from "../../context/HoverContext";
import { FilterProvider } from "../../context/FilterContext";
import { RotateYProvider } from "../../context/RotateYContext";
import { ImageListProvider } from "../../context/ImageListState";
import { MediaStateProvider } from "../../context/MediaStateContext";
import { useScreenMode } from "../../context/ScreenContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useThreeInfo, useThreeState } from "../../context/ThreeContext/ThreeContext";

const Container = () => {
  const { screenMode } = useScreenMode();
  const { threeState } = useThreeState();
  const { threeInfo, threeInfoDispatch } = useThreeInfo();
  const { mediaInfo, mediaInfoDispatch } = useMediaInfo();

  useLayoutEffect(() => {
    if (mediaInfo.file.character[1] === "") {
      mediaInfoDispatch({ type: "random" });
    }
    if (threeInfo.model[1] === "") {
      threeInfoDispatch({ type: "random", payload: "all" });
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
                {threeState.active.threeD && <ThreeControl />}
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
