// 後にsceneにanotherCharacterを追加

type MediaOriginType =
  | "cg"
  | "character"
  | "anotherCharacter"
  | "video"
  | "voice"
  | "effect";

type MediaInfoType = {
  folder: {
    // [key]: [index, name]
    [P in MediaOriginType]: [number, string];
  };
  file: {
    // [key]: [index, name, length]
    [P in MediaOriginType]: [number, string, number];
  };
};

const mediaInfoInit: MediaInfoType = {
  folder: {
    cg: [0, ""],
    character: [0, ""],
    anotherCharacter: [0, ""],
    video: [0, ""],
    voice: [0, ""],
    effect: [0, ""],
  },
  file: {
    cg: [0, "", 0],
    character: [0, "", 0],
    anotherCharacter: [0, "", 0],
    video: [0, "", 0],
    voice: [0, "", 0],
    effect: [0, "", 0],
  },
};

type MediaActiveType = {
  anotherCharacter: boolean;
  doublePage: boolean;
};

export { type MediaOriginType, type MediaInfoType, mediaInfoInit, type MediaActiveType };
