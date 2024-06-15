import "./App.css";
import { SceneProvider } from "./context/SceneContext";
import { ScreenProvider } from "./context/ScreenContext";
import { MediaInfoProvider } from "./context/MediaInfoContext/MediaInfoContext";
import { EffectStateProvider } from "./context/EffectState/EffectStateContext";
import Container from "./components/Container/Container";

function App() {
  return (
    <SceneProvider>
      <ScreenProvider>
        <EffectStateProvider>
          <MediaInfoProvider>
            <Container />
          </MediaInfoProvider>
        </EffectStateProvider>
      </ScreenProvider>
    </SceneProvider>
  );
}

export default App;
