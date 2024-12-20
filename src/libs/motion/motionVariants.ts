import { type Variants } from "motion/react";

// 参考: https://motion.dev/docs/react-transitions
const cardRefresh = (rotateY: boolean): Variants => ({
  hidden: { scale: 0, rotateZ: 540, rotateY: rotateY ? 180 : 0 },
  visible: {
    scale: 1,
    rotateZ: 0,
    rotateY: rotateY ? 180 : 0,
    transition: {
      default: {
        type: "spring",
        bounce: 0.6,
        duration: 2.1,
      },
      scale: {
        type: "spring",
        bounce: 0.4,
        duration: 1.5,
      },
      rotateZ: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
});

const cardImgRefresh: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      default: {
        type: "spring",
        mass: 1.5,
      },
      opacity: {
        ease: "linear",
      },
    },
  },
};

const flipBookRefresh: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", mass: 1.5 },
  },
};

export { cardRefresh, cardImgRefresh, flipBookRefresh };
