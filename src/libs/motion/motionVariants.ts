const cardRefresh = (rotateY: boolean) => ({
  hidden: { scale: 0, rotate: 360, rotateY: rotateY ? -180 : -360 },
  visible: {
    scale: 1,
    rotate: 0,
    rotateY: rotateY ? 180 : 0,
    transition: { duration: 1, ease: "linear", type: "spring", restSpeed: 2 },
  },
});

const bgRefresh = {
  hidden: { scale: 3 },
  visible: {
    scale: 1,
    transition: {
      delay: 0.1,
      duration: 2,
      ease: "linear",
      type: "spring",
      restSpeed: 2,
      mass: 0.7,
    },
  },
};

export { cardRefresh, bgRefresh };
