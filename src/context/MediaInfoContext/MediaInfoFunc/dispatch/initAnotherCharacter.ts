import { type MediaInfoType } from "../../mediaInfo";

const initAnotherCharacter = (state: MediaInfoType): MediaInfoType => {
  return {
    folder: {
      ...state.folder,
      anotherCharacter: state["folder"].character,
    },
    file: {
      ...state.file,
      anotherCharacter: state["file"].character,
    },
  };
};

export { initAnotherCharacter };
