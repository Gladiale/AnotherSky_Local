const cardRefresh = (rotateY: boolean) => ({
  hidden: { scale: 0, rotateZ: 540, rotateY: rotateY ? 180 : 0 },
  visible: {
    scale: 1,
    rotateZ: 0,
    rotateY: rotateY ? 180 : 0,
    transition: {
      type: "spring",
      bounce: 0.6,
      duration: 2.3,
    },
  },
});

const cardImgRefresh = {
  hidden: { x: 300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", mass: 1.5 },
  },
};

const flipBookRefresh = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", mass: 1.5 },
  },
};

export { cardRefresh, cardImgRefresh, flipBookRefresh };
