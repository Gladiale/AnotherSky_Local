import { useEffect, useState } from "react";

const useFullScreen = () => {
  // フルスクリーン(https://gray-code.com/javascript/display-the-page-in-full-screen/)
  // コンポーネント外の操作は副作用なので、useEffectを使います

  // const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // useEffect(() => {
  //   if (document.fullscreenElement === null && isFullScreen) {
  //     document.body.requestFullscreen();
  //   } else if (document.fullscreenElement !== null) {
  //     document.exitFullscreen();
  //   }
  // }, [isFullScreen]);

  // const changeFullScreen = () => {
  //   setIsFullScreen((prev) => !prev);
  // };

  const [isFullScreen, setIsFullScreen] = useState<boolean>(
    document.fullscreenElement !== null
  );

  const handleFullScreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const changeFullScreen = async () => {
    isFullScreen
      ? await document.exitFullscreen()
      : await document.body.requestFullscreen();
  };

  return { changeFullScreen };
};

export { useFullScreen };
