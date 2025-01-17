import styles from "./Directory.module.css";
import { CGDataObj } from "../../data/CGDataObj";
import { VideoDataObj } from "../../data/VideoDataObj";
import { CharacterDataObj } from "../../data/CharacterDataObj";
import { getDirectoryData } from "../../libs/utils/dataObjControl";

import {
  type DirectoryTargetType,
  useScene,
  useDirectoryInfo,
} from "../../context/SceneContext";
import { useScreenMode } from "../../context/ScreenContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";

const getTargetData = (target: DirectoryTargetType) => {
  switch (target) {
    case "cg":
      return getDirectoryData(CGDataObj);
    case "character":
      return getDirectoryData(CharacterDataObj);
    default:
      return getDirectoryData(VideoDataObj);
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
  const { directoryTarget, pageIndex, setPageIndex } = useDirectoryInfo();

  const directoryData = getTargetData(directoryTarget);
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
      className={`${styles["directory-container"]}
      ${screenMode === "cgMode" && styles.cgMode}`}
    >
      <div
        className={`${styles["gird-box"]}
        ${directoryTarget === "character" && styles.character}
        ${directoryTarget === "video" && styles.video}`}
      >
        {directorySliced[pageIndex].map((directory, index) => (
          <div key={index} className={styles.item} onClick={() => setDirectory(index)}>
            {directoryTarget != "video" && (
              <img src={`/${directoryTarget}/${directory[0][1]}/${directory[1][1]}`} />
            )}
            <p>{directory[0][1]}</p>
          </div>
        ))}
      </div>
      <div className={styles.pageNav}>
        {directorySliced.map((_, index) => (
          <div
            key={index}
            onClick={() => setPageIndex(index)}
            className={`${styles.pageButton} ${pageIndex === index && styles.active}`}
          >
            <p>{index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directory;
