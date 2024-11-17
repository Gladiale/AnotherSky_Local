import { BsChevronLeft } from "react-icons/bs";
import { useScene } from "../../context/SceneContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import IconDefault from "../Common/IconDefault";

const ToPrev = () => {
  const { scene } = useScene();
  const { mediaDispatch } = useMediaInfo();

  const toPrevImage = () => {
    mediaDispatch({ type: "prev", payload: scene });
  };

  const toPrevFolder = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    mediaDispatch({ type: "folderPrev", payload: scene });
  };

  return (
    <IconDefault onClick={toPrevImage} onContextMenu={toPrevFolder}>
      <BsChevronLeft />
    </IconDefault>
  );
};

export default ToPrev;
