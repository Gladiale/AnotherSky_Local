import styles from "./Directory.module.css";
import { useEffect, useMemo, useRef } from "react";
import { folderData } from "../../App";
import { getDirectoryData } from "../../libs/utils/dataObjControl";
import {
  type DirectoryTargetType,
  useScene,
  useDirectoryInfo,
} from "../../context/SceneContext";
import { useScreenMode } from "../../context/ScreenContext";
import { useContentWidth } from "../../context/OtherContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
// framer-motion
import { AnimatePresence, motion } from "motion/react";
import { staggerAnimation } from "../../libs/motion/motionVariants";

const getTargetData = (target: DirectoryTargetType) => {
  switch (target) {
    case "cg":
      return getDirectoryData(folderData.cgData);
    case "character":
      return getDirectoryData(folderData.characterData);
    default:
      return getDirectoryData(folderData.videoData);
  }
};

const sliceListByNum = (
  array: [[number, string], [number, string, number]][],
  contentNum: number
) => {
  // 切り上げ
  const maxPage = Math.ceil(array.length / contentNum);
  let newArr = [];
  for (let i = 0; i < maxPage; i++) {
    const arr = array.slice(i * contentNum, (i + 1) * contentNum);
    newArr.push(arr);
  }
  return newArr;
};

const Directory = () => {
  const { setScene } = useScene();
  const { screenMode } = useScreenMode();
  const { mediaInfoDispatch } = useMediaInfo();
  const { setContentWidth } = useContentWidth();
  const { directoryTarget, pageIndex, setPageIndex } = useDirectoryInfo();

  const directoryRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    setContentWidth((prev) => ({
      ...prev,
      main: directoryRef.current.offsetWidth,
    }));
  }, []);

  // メモ化
  const directoryData = useMemo(() => getTargetData(directoryTarget), [directoryTarget]);
  // console.log("directoryData:", directoryData);
  const directorySliced = sliceListByNum(directoryData, 9);
  // console.log("sliced:", directorySliced);

  // 左クリック実行
  const setDirectory = (index: number) => {
    mediaInfoDispatch({
      type: "specific",
      payload: {
        target: directoryTarget,
        fileInfo: directorySliced[pageIndex][index],
      },
    });
    directoryTarget === "cg" && setScene("cg");
    directoryTarget === "video" && setScene("video");
  };

  return (
    <div
      ref={directoryRef}
      className={`${styles["directory-container"]}
      ${screenMode === "cgMode" && styles.cgMode}`}
    >
      <div
        className={`${styles["gird-box"]}
        ${directoryTarget === "character" && styles.character}
        ${directoryTarget === "video" && styles.video}`}
      >
        {directorySliced[pageIndex].map((directory, index) => (
          <AnimatePresence key={index}>
            <motion.div
              className={styles.item}
              onClick={() => setDirectory(index)}
              // framer-motion用
              custom={index}
              key={directory[0][0]}
              variants={staggerAnimation}
              initial="initial"
              animate="visible"
            >
              {directoryTarget != "video" && (
                <img src={`/${directoryTarget}/${directory[0][1]}/${directory[1][1]}`} />
              )}
              <p>{directory[0][1]}</p>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>

      <div className={styles["nav-box"]}>
        <button
          type="button"
          className={styles["prev-btn"]}
          onClick={() =>
            setPageIndex(
              (prev) => (prev - 1 + directorySliced.length) % directorySliced.length
            )
          }
          onContextMenu={(e) => {
            e.preventDefault();
            setPageIndex(0);
          }}
        >
          Prev
        </button>

        {directorySliced.map((_, index) => (
          <button
            key={index}
            onClick={() => setPageIndex(index)}
            type="button"
            className={`${styles["page-btn"]} ${pageIndex === index && styles.active}`}
            style={{
              display:
                (index > pageIndex + 3 && index > 6) ||
                (index < pageIndex - 3 && index < directorySliced.length - 7)
                  ? "none"
                  : "inline-block",
            }}
          >
            {(index > pageIndex + 2 && index > 5) ||
            (index < pageIndex - 2 && index < directorySliced.length - 6)
              ? "..."
              : index + 1}
          </button>
        ))}

        <button
          type="button"
          className={styles["next-btn"]}
          onClick={() => setPageIndex((prev) => (prev + 1) % directorySliced.length)}
          onContextMenu={(e) => {
            e.preventDefault();
            setPageIndex(directorySliced.length - 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Directory;
