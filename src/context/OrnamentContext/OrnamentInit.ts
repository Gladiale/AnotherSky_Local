type OrnamentInfoType = {
  // index, url, length
  backLight: [number, string, number];
  magicCircle1st: [number, string, number];
  magicCircle2nd: [number, string, number];
};

type OrnamentStateType = {
  state: "random" | "fixed";
  color: {
    backLight: [string, string];
    magicCircle: string;
  };
};

const ornamentInfoInit: OrnamentInfoType = {
  backLight: [0, "", 0],
  magicCircle1st: [0, "", 0],
  magicCircle2nd: [0, "", 0],
};

const ornamentStateInit: OrnamentStateType = {
  state: "fixed",
  color: {
    backLight: ["#fff760", "#ffff02"],
    magicCircle: "transparent",
  },
};

export {
  ornamentInfoInit,
  ornamentStateInit,
  type OrnamentInfoType,
  type OrnamentStateType,
};
