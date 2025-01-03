type ThreeInfoType = {
  // index, url, length
  model: [number, string, number];
  motion: [number, string, number];
  pose: [number, string, number];
};

type ThreeStateType = {
  // modelType: "mmd";
  active: {
    threeD: boolean;
    rotate: boolean;
    background: boolean;
    controlPanel: boolean;
  };
  actionMode: "motion" | "pose" | "none";
};

const threeInfoInit: ThreeInfoType = {
  model: [0, "", 0],
  motion: [0, "", 0],
  pose: [0, "", 0],
};

const threeStateInit: ThreeStateType = {
  active: {
    threeD: false,
    rotate: false,
    background: true,
    controlPanel: false,
  },
  actionMode: "none",
};

export { threeInfoInit, threeStateInit, type ThreeInfoType, type ThreeStateType };
