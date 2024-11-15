import { useLayoutEffect, useState } from "react";

// 参考：https://zenn.dev/kenghaya/articles/6020b6192dadec

const useWindowSize = () => {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export { useWindowSize };
