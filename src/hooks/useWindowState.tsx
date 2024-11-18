import { useLayoutEffect, useState } from "react";

// 参考：https://zenn.dev/kenghaya/articles/6020b6192dadec

const useWindowState = () => {
  const [isMobileSize, setIsMobileSize] = useState<boolean>(false);

  useLayoutEffect(() => {
    const updateState = () => {
      window.innerWidth <= 768 ? setIsMobileSize(true) : setIsMobileSize(false);
    };

    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, []);

  return { isMobileSize };
};

export { useWindowState };
