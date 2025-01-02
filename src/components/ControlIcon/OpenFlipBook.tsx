import { useRotateY } from "../../context/RotateYContext";
import { useMediaActive } from "../../context/MediaInfoContext/MediaInfoContext";
import { GiBlackBook } from "react-icons/gi";
import IconDefault from "../Common/IconDefault";

const OpenFlipBook = () => {
  const { setMediaActive } = useMediaActive();
  const { rotateYDispatch } = useRotateY();

  const changeScene = () => {
    rotateYDispatch({ type: "cg", payload: { isReset: true } });
    setMediaActive((prev) => ({ ...prev, doublePage: !prev.doublePage }));
  };

  return (
    <IconDefault onClick={changeScene}>
      <GiBlackBook />
    </IconDefault>
  );
};

export default OpenFlipBook;
