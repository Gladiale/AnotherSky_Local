type MediaInfoType = {
  folder: {
    cgFolder: [number, string];
    standFolder: [number, string];
    videoFolder: [number, string];
    voiceFolder: [number, string];
    effectFolder: [number, string];
  };

  file: {
    cgFile: [number, string];
    standFile: [number, string];
    videoFile: [number, string];
    voiceFile: [number, string];
    effectFile: [number, string];
  };
};

const mediaInfoInit: MediaInfoType = {
  folder: {
    cgFolder: [0, ""],
    standFolder: [0, ""],
    videoFolder: [0, ""],
    voiceFolder: [0, ""],
    effectFolder: [0, ""],
  },
  file: {
    cgFile: [0, ""],
    standFile: [0, ""],
    videoFile: [0, ""],
    voiceFile: [0, ""],
    effectFile: [0, ""],
  },
};

export { type MediaInfoType, mediaInfoInit };
