import styles from "./Container.module.css";
import { useLayoutEffect } from "react";

import Content from "../Content/Content";
import Control from "../Control/Control";
import ThreeControl from "../ThreeBox/ThreeControl";
import Information from "../Information/Information";
import { FilterProvider } from "../../context/FilterContext";
import { RotateYProvider } from "../../context/RotateYContext";
import { ImageListProvider } from "../../context/ImageListState";
import { MediaStateProvider } from "../../context/MediaStateContext";
import { useScreenMode } from "../../context/ScreenContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useOrnamentInfo } from "../../context/OrnamentContext/OrnamentContext";
import { useThreeInfo, useThreeState } from "../../context/ThreeContext/ThreeContext";

const Container = () => {
  const { screenMode } = useScreenMode();
  const { threeState } = useThreeState();
  const { threeInfo, threeInfoDispatch } = useThreeInfo();
  const { mediaInfo, mediaInfoDispatch } = useMediaInfo();
  const { ornamentInfo, ornamentInfoDispatch } = useOrnamentInfo();

  useLayoutEffect(() => {
    if (mediaInfo.file.character[1] === "") {
      mediaInfoDispatch({ type: "random" });
    }
    if (threeInfo.model[1] === "") {
      threeInfoDispatch({ type: "random", payload: "all" });
    }
    if (ornamentInfo.backLight[1] === "") {
      ornamentInfoDispatch({
        type: "default",
        payload: ["backLight", "magicCircle1st", "magicCircle2nd"],
      });
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
          <ImageListProvider>
            <MediaStateProvider>
              <Content />
              {threeState.active.threeD && <ThreeControl />}
              <Control />
              <Information />
            </MediaStateProvider>
          </ImageListProvider>
        </RotateYProvider>
      </FilterProvider>
    </div>
  );
};

export default Container;
