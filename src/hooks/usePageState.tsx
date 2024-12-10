import { useEffect, useState } from "react";

type PageStateType = {
  left: {
    scale: 0 | 1;
    rotateY: boolean;
    frontSideScale: 0 | 1;
    backSideZIndex: -9 | 9;
    backSideScale: 0 | 1;
  };
  right: {
    scale: 0 | 1;
    rotateY: boolean;
    frontSideScale: 0 | 1;
    backSideZIndex: -9 | 9;
    backSideScale: 0 | 1;
  };
};

const pageStateInit: PageStateType = {
  left: {
    scale: 1,
    rotateY: false,
    frontSideScale: 1,
    backSideZIndex: -9,
    backSideScale: 0,
  },
  right: {
    scale: 1,
    rotateY: false,
    frontSideScale: 1,
    backSideZIndex: -9,
    backSideScale: 0,
  },
};

const usePageState = () => {
  const [pageState, setPageState] = useState<PageStateType>(pageStateInit);

  const changePageRotateY = (page: keyof PageStateType) => {
    setPageState({
      ...pageState,
      [page]: {
        ...pageState[page],
        rotateY: !pageState[page].rotateY,
      },
    });
  };

  // left
  useEffect(() => {
    const timeoutId1st = setTimeout(() => {
      setPageState((prev) => ({
        ...prev,
        left: {
          ...prev["left"],
          frontSideScale: prev["left"].rotateY ? 0 : 1,
          backSideZIndex: prev["left"].rotateY ? 9 : -9,
          backSideScale: prev["left"].rotateY ? 1 : 0,
        },
      }));
    }, 500);
    const timeoutId2nd = setTimeout(
      () => {
        setPageState((prev) => ({
          ...prev,
          left: {
            ...prev["left"],
            scale: prev["left"].rotateY ? 0 : 1,
          },
        }));
      },
      pageState.left.rotateY ? 1000 : 0
    );
    return () => {
      clearTimeout(timeoutId1st);
      clearTimeout(timeoutId2nd);
    };
  }, [pageState.left.rotateY]);

  // right
  useEffect(() => {
    const timeoutId1st = setTimeout(() => {
      setPageState((prev) => ({
        ...prev,
        right: {
          ...prev["right"],
          frontSideScale: prev["right"].rotateY ? 0 : 1,
          backSideZIndex: prev["right"].rotateY ? 9 : -9,
          backSideScale: prev["right"].rotateY ? 1 : 0,
        },
      }));
    }, 500);
    const timeoutId2nd = setTimeout(
      () => {
        setPageState((prev) => ({
          ...prev,
          right: {
            ...prev["right"],
            scale: prev["right"].rotateY ? 0 : 1,
          },
        }));
      },
      pageState.right.rotateY ? 1000 : 0
    );
    return () => {
      clearTimeout(timeoutId1st);
      clearTimeout(timeoutId2nd);
    };
  }, [pageState.right.rotateY]);

  return { pageState, changePageRotateY };
};

export { usePageState };
