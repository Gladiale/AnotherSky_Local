import { useLayoutEffect, useState } from "react";
import {
  useMediaActive,
  useMediaInfo,
} from "../context/MediaInfoContext/MediaInfoContext";
import { type SpecificPayloadType } from "../context/MediaInfoContext/MediaInfoFunc/dispatch/toMediaSpecificFile";
// Data
import { CGDataObj } from "../data/CGDataObj";
import { CharacterDataObj } from "../data/CharacterDataObj";
import { getTargetList } from "../helper/getTargetList";

const useUrlList = () => {
  const { mediaInfo } = useMediaInfo();
  const { mediaActive } = useMediaActive();

  const [targetList, setTargetList] = useState<string[]>([]);
  const [firstLastInfo, setFirstLastInfo] = useState<{
    first: SpecificPayloadType["fileInfo"];
    last: SpecificPayloadType["fileInfo"];
  }>(null!);

  const target: "anotherCharacter" | "cg" = mediaActive.anotherCharacter
    ? "anotherCharacter"
    : "cg";
  useLayoutEffect(() => {
    const { targetFileList, firstFileInfo, lastFileInfo } = getTargetList(
      target,
      target === "cg" ? CGDataObj : CharacterDataObj,
      mediaInfo
    );
    setTargetList(targetFileList);
    setFirstLastInfo({
      first: firstFileInfo,
      last: lastFileInfo,
    });
  }, [mediaInfo.folder[target][1], mediaInfo.file[target][1]]);

  const urlList = targetList.map(
    (item) =>
      `/${target === "cg" ? "cg" : "character"}/${mediaInfo.folder[target][1]}/${item}`
  );

  return { urlList, firstLastInfo, target };
};

export { useUrlList };
