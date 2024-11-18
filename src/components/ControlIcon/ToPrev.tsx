import { BsChevronLeft } from "react-icons/bs";
import { useScene } from "../../context/SceneContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  mobileHidden?: boolean;
};

const ToPrev = ({ mobileHidden }: PropsType) => {
  const { scene } = useScene();
  const { mediaInfoDispatch } = useMediaInfo();

  const toPrevImage = () => {
    mediaInfoDispatch({ type: "prev", payload: scene });
  };

  const toPrevFolder = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    mediaInfoDispatch({ type: "folderPrev", payload: scene });
  };

  return (
    <IconDefault
      mobileHidden={mobileHidden}
      onClick={toPrevImage}
      onContextMenu={toPrevFolder}
    >
      <BsChevronLeft />
    </IconDefault>
  );
};

export default ToPrev;
