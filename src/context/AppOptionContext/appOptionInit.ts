type AppOptionType = {
  loadingAnime: boolean;
  parallax: boolean;
  rotateYIsRightCLick: boolean;

  lastingAnime: {
    cg: boolean;
    video: boolean;
  };

  dropShadow: {
    cg: boolean;
    video: boolean;
    icon: boolean;
    character: boolean;
  };
};

const appOptionInit: AppOptionType = {
  loadingAnime: true,
  parallax: true,
  rotateYIsRightCLick: false,

  lastingAnime: {
    cg: true,
    video: true,
  },

  dropShadow: {
    cg: false,
    video: false,
    icon: true,
    character: false,
  },
};

export { appOptionInit, type AppOptionType };
