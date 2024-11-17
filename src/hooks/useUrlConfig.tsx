import { useMediaInfo } from "../context/MediaInfoContext/MediaInfoContext";

const useUrlConfig = () => {
  const { mediaState } = useMediaInfo();

  const urlConfig = {
    cg: `/cg/${mediaState.folder.cg[1]}/${mediaState.file.cg[1]}`,
    character: `/character/${mediaState.folder.character[1]}/${mediaState.file.character[1]}`,
    anotherCharacter: `/character/${mediaState.folder.anotherCharacter[1]}/${mediaState.file.anotherCharacter[1]}`,
    video: `/video/${mediaState.folder.video[1]}/${mediaState.file.video[1]}`,
    effect: `/effect/${mediaState.folder.effect[1]}/${mediaState.file.effect[1]}`,
    voice: `/voice/${mediaState.folder.voice[1]}/${mediaState.file.voice[1]}`,
  };

  return { urlConfig };
};

export { useUrlConfig };
