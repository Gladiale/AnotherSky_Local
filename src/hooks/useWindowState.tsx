import { useLayoutEffect, useState } from "react";

// 参考：https://zenn.dev/kenghaya/articles/6020b6192dadec

const useWindowState = () => {
  // const [size, setSize] = useState<[number, number]>([0, 0]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useLayoutEffect(() => {
    const updateState = () => {
      // setSize([window.innerWidth, window.innerHeight]);
      window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false);
    };

    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, []);

  return { isMobile };
};

export { useWindowState };
