type ThreeInfoType = {
  // index, url, length
  model: [number, string, number];
  matCap: [number, string, number];
  motion: [number, string, number];
  pose: [number, string, number];
};

type ThreeStateType = {
  // modelType: "mmd";
  active: {
    threeD: boolean;
    matCap: boolean;
    rotate: boolean;
    background: boolean;
    controlPanel: boolean;
  };
  actionMode: "motion" | "pose" | "none";
  motionSpeed: number;
};

const threeInfoInit: ThreeInfoType = {
  model: [0, "", 0],
  matCap: [0, "", 0],
  motion: [0, "", 0],
  pose: [0, "", 0],
};

const threeStateInit: ThreeStateType = {
  active: {
    threeD: false,
    matCap: false,
    rotate: false,
    background: false,
    controlPanel: false,
  },
  actionMode: "none",
  motionSpeed: 0.03,
};

export { threeInfoInit, threeStateInit, type ThreeInfoType, type ThreeStateType };
