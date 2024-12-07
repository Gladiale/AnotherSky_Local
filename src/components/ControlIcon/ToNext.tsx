import { BsChevronRight } from "react-icons/bs";
import {
  useMediaActive,
  useMediaInfo,
} from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  active?: "onlyMobile" | "onlyDesk";
};

const ToNext = ({ active }: PropsType) => {
  const { scene } = useScene();
  const { mediaActive } = useMediaActive();
  const { mediaInfoDispatch } = useMediaInfo();

  const toNextImage = () => {
    mediaInfoDispatch({ type: "next", payload: { scene, mediaActive } });
  };

  const toNextFolder = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    mediaInfoDispatch({ type: "folderNext", payload: { scene, mediaActive } });
  };

  return (
    <IconDefault active={active} onClick={toNextImage} onContextMenu={toNextFolder}>
      <BsChevronRight />
    </IconDefault>
  );
};

export default ToNext;
