import { useLayoutEffect, useState } from "react";
import {
  useMediaActive,
  useMediaInfo,
} from "../context/MediaInfoContext/MediaInfoContext";
import { type SpecificPayloadType } from "../context/MediaInfoContext/MediaInfoFunc/dispatch/toMediaSpecificFile";
// Data
import { folderData } from "../App";
import { getTargetList } from "../libs/utils/getTargetList";
import { useScene } from "../context/SceneContext";

const useUrlList = () => {
  const { mediaInfo } = useMediaInfo();
  const { mediaActive } = useMediaActive();
  const { scene } = useScene();

  const [targetList, setTargetList] = useState<string[]>([]);
  const [firstLastInfo, setFirstLastInfo] = useState<{
    first: SpecificPayloadType["fileInfo"];
    last: SpecificPayloadType["fileInfo"];
  }>(null!);

  const target: "anotherCharacter" | "cg" | "video" =
    scene === "video"
      ? "video"
      : mediaActive.anotherCharacter
        ? "anotherCharacter"
        : "cg";

  useLayoutEffect(() => {
    const { targetFileList, firstFileInfo, lastFileInfo } = getTargetList(
      target,
      scene === "video"
        ? folderData.videoData
        : mediaActive.anotherCharacter
          ? folderData.characterData
          : folderData.cgData,
      mediaInfo,
    );
    setTargetList(targetFileList);
    setFirstLastInfo({
      first: firstFileInfo,
      last: lastFileInfo,
    });
  }, [mediaInfo.folder[target][1], mediaInfo.file[target][1]]);

  const urlList = targetList.map(
    (item) =>
      `/${target === "anotherCharacter" ? "character" : target}/${mediaInfo.folder[target][1]}/${item}`,
  );

  return { urlList, firstLastInfo, target };
};

export { useUrlList };
