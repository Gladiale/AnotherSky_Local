import styles from "./Icon.module.css";
import { useEffect, useState } from "react";
import { GiEclipseFlare } from "react-icons/gi";

const FullScreen = () => {
  // フルスクリーン(https://gray-code.com/javascript/display-the-page-in-full-screen/)
  // コンポーネント外の操作は副作用なので、useEffectを使います
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleFullScreen = (e: any) => {
    e.stopPropagation();
    setIsFullScreen((prev) => !prev);
  };

  useEffect(() => {
    if (document.fullscreenElement === null && isFullScreen) {
      document.body.requestFullscreen();
    } else if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  return <GiEclipseFlare className={styles.icon} onClick={handleFullScreen} />;
};

export default FullScreen;
