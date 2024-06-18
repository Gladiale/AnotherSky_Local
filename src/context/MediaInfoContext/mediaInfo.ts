type MediaInfoType = {
  folder: {
    cg: [number, string];
    character: [number, string];
    video: [number, string];
    voice: [number, string];
    effect: [number, string];
  };

  file: {
    cgFile: [number, string];
    characterFile: [number, string];
    videoFile: [number, string];
    voiceFile: [number, string];
    effectFile: [number, string];
  };
};

const mediaInfoInit: MediaInfoType = {
  folder: {
    cg: [0, ""],
    character: [0, ""],
    video: [0, ""],
    voice: [0, ""],
    effect: [0, ""],
  },
  file: {
    cgFile: [0, ""],
    characterFile: [0, ""],
    videoFile: [0, ""],
    voiceFile: [0, ""],
    effectFile: [0, ""],
  },
};

export { type MediaInfoType, mediaInfoInit };
