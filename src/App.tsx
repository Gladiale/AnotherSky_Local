import { SceneProvider } from "./context/SceneContext";
import { ScreenProvider } from "./context/ScreenContext";
import { AppOptionProvider } from "./context/AppOptionContext/AppOptionContext";
import { MediaInfoProvider } from "./context/MediaInfoContext/MediaInfoContext";
import { EffectStateProvider } from "./context/EffectStateContext/EffectStateContext";
import { ThreeProvider } from "./context/ThreeContext/ThreeContext";
import Container from "./components/Container/Container";
import AppOption from "./components/AppOption/AppOption";

function App() {
  // useLayoutEffect(() => {
  //   // HTMLのfontSizeを画面表示倍率に応じて自動変更
  //   const resolution = window.devicePixelRatio;
  //   // console.log(`resolution: ${resolution}dppx`);
  //   if (resolution != 1) {
  //     document.documentElement.style.fontSize = `${16 / resolution}px`;
  //   }
  // }, []);

  return (
    <SceneProvider>
      <ScreenProvider>
        <EffectStateProvider>
          <MediaInfoProvider>
            <ThreeProvider>
              <AppOptionProvider>
                <Container />
                <AppOption />
              </AppOptionProvider>
            </ThreeProvider>
          </MediaInfoProvider>
        </EffectStateProvider>
      </ScreenProvider>
    </SceneProvider>
  );
}

export default App;
