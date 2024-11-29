import { useEffect, useState } from "react";
import { CGDataObj } from "../data/CGDataObj";
import { getFileList } from "../helper/dataObjControl";
import { useMediaInfo } from "../context/MediaInfoContext/MediaInfoContext";

const useUrlConfig = () => {
  const { mediaInfo } = useMediaInfo();
  const [nextCG, setNextCG] = useState<string>("");

  useEffect(() => {
    const doublePage = false;
    if (doublePage) {
      const getNextCG = () => {
        const fileList: string[] = getFileList(CGDataObj, mediaInfo.folder["cg"][1]);
        const nextIndex = (mediaInfo.file["cg"][0] + 1) % fileList.length;
        return fileList[nextIndex];
      };
      const nextCg = getNextCG();
      setNextCG(nextCg);
    }
  }, [mediaInfo.folder.cg[1], mediaInfo.file.cg[1]]);

  const urlConfig = {
    cg: `/cg/${mediaInfo.folder.cg[1]}/${mediaInfo.file.cg[1]}`,
    nextCG: `/cg/${mediaInfo.folder.cg[1]}/${nextCG}`,
    character: `/character/${mediaInfo.folder.character[1]}/${mediaInfo.file.character[1]}`,
    anotherCharacter: `/character/${mediaInfo.folder.anotherCharacter[1]}/${mediaInfo.file.anotherCharacter[1]}`,
    video: `/video/${mediaInfo.folder.video[1]}/${mediaInfo.file.video[1]}`,
    effect: `/effect/${mediaInfo.folder.effect[1]}/${mediaInfo.file.effect[1]}`,
    voice: `/voice/${mediaInfo.folder.voice[1]}/${mediaInfo.file.voice[1]}`,
  };

  return { urlConfig };
};

export { useUrlConfig };
