import { AppOptionProvider } from "../context/AppOptionContext/AppOptionContext";
import { EffectStateProvider } from "../context/EffectStateContext/EffectStateContext";
import { FilterProvider } from "../context/FilterContext";
import { HoverProvider } from "../context/HoverContext";
import { ImageListProvider } from "../context/ImageListState";
import { MediaInfoProvider } from "../context/MediaInfoContext/MediaInfoContext";
import { MediaStateProvider } from "../context/MediaStateContext";
import { OrnamentProvider } from "../context/OrnamentContext/OrnamentContext";
import { OtherProvider } from "../context/OtherContext";
import { RotateYProvider } from "../context/RotateYContext";
import { SceneProvider } from "../context/SceneContext";
import { ScreenProvider } from "../context/ScreenContext";
import { ThreeProvider } from "../context/ThreeContext/ThreeContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SceneProvider>
      <ScreenProvider>
        <EffectStateProvider>
          <MediaInfoProvider>
            <OrnamentProvider>
              <ThreeProvider>
                <HoverProvider>
                  <OtherProvider>
                    <AppOptionProvider>
                      <FilterProvider>
                        <RotateYProvider>
                          <ImageListProvider>
                            <MediaStateProvider>{children}</MediaStateProvider>
                          </ImageListProvider>
                        </RotateYProvider>
                      </FilterProvider>
                    </AppOptionProvider>
                  </OtherProvider>
                </HoverProvider>
              </ThreeProvider>
            </OrnamentProvider>
          </MediaInfoProvider>
        </EffectStateProvider>
      </ScreenProvider>
    </SceneProvider>
  );
};

export default Provider;
