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
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { RotateYProvider } from "../../context/RotateYContext";
import { CardCharacterProvider } from "../../context/CardCharacterContext";

const Container = () => {
  const { mediaState, mediaDispatch } = useMediaInfo();
  const { screenMode } = useScreenMode();
  const { effectState } = useEffectState();

  useLayoutEffect(() => {
    if (mediaState.file.characterFile[1] === "") {
      mediaDispatch({ type: "random" });
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
        <CardCharacterProvider>
          <RotateYProvider>
            <HoverProvider>
              <ImageListProvider>
                <Content />
                <Control />
                <Information />
              </ImageListProvider>
            </HoverProvider>
          </RotateYProvider>
        </CardCharacterProvider>
      </FilterProvider>
    </div>
  );
};

export default Container;
