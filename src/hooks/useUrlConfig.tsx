import { useCardCharacterInfo } from "../context/CardCharacterContext";
import { useMediaInfo } from "../context/MediaInfoContext/MediaInfoContext";

const useUrlConfig = () => {
  const { mediaState } = useMediaInfo();
  const { characterInfo } = useCardCharacterInfo();

  const urlConfig = {
    cg: `/cg/${mediaState.folder.cg[1]}/${mediaState.file.cgFile[1]}`,
    character: `/character/${mediaState.folder.character[1]}/${mediaState.file.characterFile[1]}`,
    cardCharacter: `/character/${characterInfo.folder[1]}/${characterInfo.file[1]}`,
    video: `/video/${mediaState.folder.video[1]}/${mediaState.file.videoFile[1]}`,
    effect: `/effect/${mediaState.folder.effect[1]}/${mediaState.file.effectFile[1]}`,
    voice: `/voice/${mediaState.folder.voice[1]}/${mediaState.file.voiceFile[1]}`,
  };

  return { urlConfig };
};

export { useUrlConfig };
