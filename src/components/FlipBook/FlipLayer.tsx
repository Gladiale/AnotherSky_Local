import styles from "./FlipBook.module.css";
import { useEffect } from "react";
import { usePageState } from "../../hooks/usePageState";
import { useContentChange } from "../../hooks/useCharaOffsetX";
import { useRotateY } from "../../context/RotateYContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { type SpecificPayloadType } from "../../context/MediaInfoContext/MediaInfoFunc/dispatch/toMediaSpecificFile";
import PageContent from "./PageContent";

type PropsType = {
  isReversing: Boolean;
  target: "cg" | "anotherCharacter";
  urlList: string[];
  layerState: {
    active: "1st" | "2nd";
    page: "first" | "last" | undefined;
  };
  setLayerState: React.Dispatch<
    React.SetStateAction<{
      active: "1st" | "2nd";
      page: "first" | "last" | undefined;
    }>
  >;
  firstLastInfo: {
    first: SpecificPayloadType["fileInfo"];
    last: SpecificPayloadType["fileInfo"];
  };
};

const FlipLayer = (props: PropsType) => {
  const { isReversing, target, urlList, layerState, setLayerState, firstLastInfo } =
    props;

  const { rotateYState } = useRotateY();
  const { mediaInfoDispatch } = useMediaInfo();
  const { pageState, changePageRotateY } = usePageState();

  const { targetRef, setLoadedTrue } = useContentChange("success", "divEl", "main");

  const changeBookPage = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.deltaY > 0) {
      if (pageState.right.rotateY) {
        changeLayerState("last");
      } else if (pageState.left.rotateY) {
        changePageRotateY("left");
      } else {
        changePageRotateY("right");
      }
    } else {
      if (pageState.left.rotateY) {
        changeLayerState("first");
      } else if (pageState.right.rotateY) {
        changePageRotateY("right");
      } else {
        changePageRotateY("left");
      }
    }
  };

  const changeLayerState = (page: "first" | "last") => {
    setLayerState((prev) => ({
      ...prev,
      active: prev.active === "1st" ? "2nd" : "1st",
      page: page,
    }));
    mediaInfoDispatch({
      type: "specific",
      payload: {
        target: target,
        fileInfo: page === "first" ? firstLastInfo.first : firstLastInfo.last,
      },
    });
  };

  useEffect(() => {
    if (layerState.page === "first") {
      changePageRotateY("left");
    }
    if (layerState.page === "last") {
      changePageRotateY("right");
    }
  }, []);

  return (
    <div
      className={styles["layer"]}
      onWheel={changeBookPage}
      ref={targetRef as React.MutableRefObject<HTMLDivElement>}
      onLoad={setLoadedTrue}
      style={{ transform: `rotateY(${rotateYState.cg ? 180 : 0}deg)` }}
    >
      <div className={styles["book-cover"]}>
        <PageContent
          className={"cover-left"}
          imgUrl={isReversing ? urlList[1] : urlList[0]}
          onClick={() => changeLayerState("first")}
        />
        <PageContent
          className={"cover-right"}
          imgUrl={isReversing ? urlList[4] : urlList[5]}
          onClick={() => changeLayerState("last")}
        />
      </div>

      <div
        className={`${styles["book-page"]} ${styles["left"]}`}
        style={{
          transform: `rotateY(${pageState.left.rotateY ? 180 : 0}deg)`,
          zIndex: pageState.left.backSideZIndex,
          // scale: String(pageState.right.scale),
        }}
        onClick={() => changePageRotateY("left")}
      >
        <PageContent
          className={"page-front"}
          imgUrl={isReversing ? urlList[3] : urlList[2]}
          style={{
            scale: String(pageState.left.frontSideScale),
          }}
        />
        <PageContent
          className={"page-back"}
          imgUrl={isReversing ? urlList[0] : urlList[1]}
          style={{
            zIndex: pageState.left.backSideZIndex,
            scale: String(pageState.left.backSideScale),
          }}
        />
      </div>

      <div
        className={`${styles["book-page"]} ${styles["right"]}`}
        style={{
          transform: `rotateY(${pageState.right.rotateY ? -180 : 0}deg)`,
          zIndex: pageState.right.backSideZIndex,
          // scale: String(pageState.left.scale),
        }}
        onClick={() => changePageRotateY("right")}
      >
        <PageContent
          className={"page-front"}
          imgUrl={isReversing ? urlList[2] : urlList[3]}
          style={{ scale: String(pageState.right.frontSideScale) }}
        />
        <PageContent
          className={"page-back"}
          imgUrl={isReversing ? urlList[5] : urlList[4]}
          style={{
            zIndex: pageState.right.backSideZIndex,
            scale: String(pageState.right.backSideScale),
          }}
        />
      </div>
    </div>
  );
};

export default FlipLayer;
