import "./SwatchesPicker.css";
import { HexAlphaColorPicker } from "react-colorful";
import { useOrnamentState } from "../../context/OrnamentContext/OrnamentContext";
// framer-motion
import { motion } from "motion/react";
import { cardImgRefresh } from "../../libs/motion/motionVariants";

const presetColor: `#${string}`[] = [
  "#7ea3d3",
  "#2565ba",
  "#2cc371",
  "#d766ced9",
  "#d933cb",
];

type PropsType = {
  target: "backLight" | "magicCircle";
  clickPosition: "left" | "right" | undefined;
  closePicker: () => void;
};

const SwatchesPicker = ({ target, clickPosition, closePicker }: PropsType) => {
  const { ornamentState, ornamentStateDispatch } = useOrnamentState();

  const currentColor =
    target === "magicCircle"
      ? ornamentState["color"]["magicCircle"]
      : clickPosition === "left"
      ? ornamentState["color"]["backLight"][0]
      : ornamentState["color"]["backLight"][1];

  const handleColorChange = (data: string) => {
    if (target === "backLight") {
      let value: [string, string];

      if (clickPosition === "left") {
        value = [data, ornamentState["color"]["backLight"][1]];
      } else {
        value = [ornamentState["color"]["backLight"][0], data];
      }

      return ornamentStateDispatch({
        type: "changeColor",
        payload: {
          target: target,
          value: value,
        },
      });
    }

    ornamentStateDispatch({
      type: "changeColor",
      payload: {
        target: target,
        value: data,
      },
    });
  };

  return (
    <motion.div
      variants={cardImgRefresh(true)}
      initial="hidden"
      animate="visible"
      className="color-box"
      onClick={(e) => e.stopPropagation()}
    >
      <button type="button" className="close-button" onClick={closePicker}>
        Close
      </button>

      <HexAlphaColorPicker color={currentColor} onChange={handleColorChange} />

      <div className="swatch-box">
        {presetColor.map((data, index) => (
          <div
            key={index}
            className="swatch-item"
            style={{ backgroundColor: data }}
            onClick={() => handleColorChange(data)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SwatchesPicker;
