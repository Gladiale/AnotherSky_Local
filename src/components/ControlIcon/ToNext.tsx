import { BsChevronRight } from "react-icons/bs";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import IconDefault from "../Common/IconDefault";

const ToNext = () => {
  const { scene } = useScene();
  const { mediaInfoDispatch } = useMediaInfo();

  const toNextImage = () => {
    mediaInfoDispatch({ type: "next", payload: scene });
  };

  const toNextFolder = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    mediaInfoDispatch({ type: "folderNext", payload: scene });
  };

  return (
    <IconDefault onClick={toNextImage} onContextMenu={toNextFolder}>
      <BsChevronRight />
    </IconDefault>
  );
};

export default ToNext;
