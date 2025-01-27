import Provider from "./components/Provider";
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
    <Provider>
      <Container />
      <AppOption />
    </Provider>
  );
}

export default App;
