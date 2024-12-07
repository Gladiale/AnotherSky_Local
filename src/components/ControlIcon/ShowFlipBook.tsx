import { useMediaActive } from "../../context/MediaInfoContext/MediaInfoContext";
import { GiBlackBook } from "react-icons/gi";
import IconDefault from "../Common/IconDefault";

const ShowFlipBook = () => {
  const { setMediaActive } = useMediaActive();

  return (
    <IconDefault
      onClick={() =>
        setMediaActive((prev) => ({ ...prev, doublePage: !prev.doublePage }))
      }
    >
      <GiBlackBook />
    </IconDefault>
  );
};

export default ShowFlipBook;
