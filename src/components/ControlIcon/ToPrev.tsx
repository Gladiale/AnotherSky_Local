import { BsChevronLeft } from "react-icons/bs";
import { useScene } from "../../context/SceneContext";
import {
  useMediaActive,
  useMediaInfo,
} from "../../context/MediaInfoContext/MediaInfoContext";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  active?: "onlyMobile" | "onlyDesk";
};

const ToPrev = ({ active }: PropsType) => {
  const { scene } = useScene();
  const { mediaActive } = useMediaActive();
  const { mediaInfoDispatch } = useMediaInfo();

  const toPrevImage = () => {
    mediaInfoDispatch({ type: "prev", payload: { scene, mediaActive } });
  };

  const toPrevFolder = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    mediaInfoDispatch({ type: "folderPrev", payload: { scene, mediaActive } });
  };

  return (
    <IconDefault active={active} onClick={toPrevImage} onContextMenu={toPrevFolder}>
      <BsChevronLeft />
    </IconDefault>
  );
};

export default ToPrev;
