import { useMediaInfo } from "../context/MediaInfoContext/MediaInfoContext";
import { useOrnamentInfo } from "../context/OrnamentContext/OrnamentContext";
import { useThreeInfo } from "../context/ThreeContext/ThreeContext";

const useUrlConfig = () => {
  const { threeInfo } = useThreeInfo();
  const { mediaInfo } = useMediaInfo();
  const { ornamentInfo } = useOrnamentInfo();

  const urlConfig = {
    cg: `/cg/${mediaInfo.folder.cg[1]}/${mediaInfo.file.cg[1]}`,
    character: `/character/${mediaInfo.folder.character[1]}/${mediaInfo.file.character[1]}`,
    anotherCharacter: `/character/${mediaInfo.folder.anotherCharacter[1]}/${mediaInfo.file.anotherCharacter[1]}`,
    video: `/video/${mediaInfo.folder.video[1]}/${mediaInfo.file.video[1]}`,
    effect: `/effect/${mediaInfo.folder.effect[1]}/${mediaInfo.file.effect[1]}`,
    voice: `/voice/${mediaInfo.folder.voice[1]}/${mediaInfo.file.voice[1]}`,
    mmd: {
      model: `/mmd/model/${threeInfo.model[1]}`,
      matCap: `/mmd/matCap/${threeInfo.matCap[1]}`,
      motion: `/mmd/motion/${threeInfo.motion[1]}`,
      pose: `/mmd/pose/${threeInfo.pose[1]}`,
    },
    ornament: {
      backLight: `/ornament/back-light/${ornamentInfo.backLight[1]}`,
      magicCircle1st: `/ornament/magic-circle/${ornamentInfo.magicCircle1st[1]}`,
      magicCircle2nd: `/ornament/magic-circle/${ornamentInfo.magicCircle2nd[1]}`,
    },
  };

  return { urlConfig };
};

export { useUrlConfig };
