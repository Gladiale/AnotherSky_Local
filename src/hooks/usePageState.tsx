import { useEffect, useState } from "react";

type PageStateType = {
  left: {
    rotateY: boolean;
    zIndex: 0 | 9;
    scale: 0 | 1;
    frontSideScale: 0 | 1;
    backSideZIndex: -9 | 9;
    backSideScale: 0 | 1;
  };
  right: {
    rotateY: boolean;
    zIndex: 0 | 9;
    scale: 0 | 1;
    frontSideScale: 0 | 1;
    backSideZIndex: -9 | 9;
    backSideScale: 0 | 1;
  };
};

const pageStateInit: PageStateType = {
  left: {
    rotateY: false,
    zIndex: 0,
    scale: 1,
    frontSideScale: 1,
    backSideZIndex: -9,
    backSideScale: 0,
  },
  right: {
    rotateY: false,
    zIndex: 0,
    scale: 1,
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
        zIndex: pageState[page].zIndex === 0 ? 9 : 0,
      },
    });
  };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setPageState((prev) => ({
  //       ...prev,
  //       left: {
  //         ...prev["left"],
  //         frontSideScale: prev["left"].rotateY ? 0 : 1,
  //         backSideZIndex: prev["left"].rotateY ? 9 : -9,
  //         backSideScale: prev["left"].rotateY ? 1 : 0,
  //       },
  //       right: {
  //         ...prev["right"],
  //         frontSideScale: prev["right"].rotateY ? 0 : 1,
  //         backSideZIndex: prev["right"].rotateY ? 9 : -9,
  //         backSideScale: prev["right"].rotateY ? 1 : 0,
  //       },
  //     }));
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [pageState.left.rotateY, pageState.right.rotateY]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
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
    return () => clearTimeout(timeoutId);
  }, [pageState.left.rotateY]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
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
    return () => clearTimeout(timeoutId);
  }, [pageState.right.rotateY]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setPageState((prev) => ({
  //       ...prev,
  //       left: {
  //         ...prev["left"],
  //         // bug
  //         scale: prev["right"].rotateY ? 0 : 1,
  //       },
  //       right: {
  //         ...prev["right"],
  //         // bug
  //         scale: prev["left"].rotateY ? 0 : 1,
  //       },
  //     }));
  //   }, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [pageState.left.rotateY, pageState.right.rotateY]);

  // right
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setPageState((prev) => ({
          ...prev,
          right: {
            ...prev["right"],
            // bug
            scale: prev["left"].rotateY ? 0 : 1,
          },
        }));
      },
      pageState.right.rotateY ? 0 : 1000
    );
    return () => clearTimeout(timeoutId);
  }, [pageState.right.rotateY]);

  // left
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setPageState((prev) => ({
          ...prev,
          left: {
            ...prev["left"],
            // bug
            scale: prev["right"].rotateY ? 0 : 1,
          },
        }));
      },
      pageState.left.rotateY ? 0 : 1000
    );
    return () => clearTimeout(timeoutId);
  }, [pageState.left.rotateY]);

  // test
  // useEffect(() => {
  //   console.log("left");
  // }, [pageState.left.rotateY]);
  // useEffect(() => {
  //   console.log("right");
  // }, [pageState.right.rotateY]);

  return { pageState, changePageRotateY };
};

export { usePageState };
