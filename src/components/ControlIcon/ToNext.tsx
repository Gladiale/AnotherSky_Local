import { BsChevronRight } from "react-icons/bs";
import { useScene } from "../../context/SceneContext";
import { useDirection } from "../../context/OtherContext";
import {
  useMediaActive,
  useMediaInfo,
} from "../../context/MediaInfoContext/MediaInfoContext";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  active?: "onlyMobile" | "onlyDesk";
};

const ToNext = ({ active }: PropsType) => {
  const { scene } = useScene();
  const { setIsNext } = useDirection();
  const { mediaActive } = useMediaActive();
  const { mediaInfoDispatch } = useMediaInfo();

  const toNextImage = () => {
    setIsNext(true);
    mediaInfoDispatch({ type: "next", payload: { scene, mediaActive } });
  };

  const toNextFolder = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsNext(true);
    mediaInfoDispatch({ type: "folderNext", payload: { scene, mediaActive } });
  };

  return (
    <IconDefault active={active} onClick={toNextImage} onContextMenu={toNextFolder}>
      <BsChevronRight />
    </IconDefault>
  );
};

export default ToNext;
