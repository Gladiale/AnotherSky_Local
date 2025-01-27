import { BiLastPage } from "react-icons/bi";
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

const ToLast = ({ active }: PropsType) => {
  const { scene } = useScene();
  const { setIsNext } = useDirection();
  const { mediaActive } = useMediaActive();
  const { mediaInfoDispatch } = useMediaInfo();

  return (
    <IconDefault
      active={active}
      onClick={() => {
        setIsNext(true);
        mediaInfoDispatch({ type: "last", payload: { scene, mediaActive } });
      }}
    >
      <BiLastPage />
    </IconDefault>
  );
};

export default ToLast;
