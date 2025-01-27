import { BiFirstPage } from "react-icons/bi";
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

const ToFirst = ({ active }: PropsType) => {
  const { scene } = useScene();
  const { setIsNext } = useDirection();
  const { mediaActive } = useMediaActive();
  const { mediaInfoDispatch } = useMediaInfo();

  return (
    <IconDefault
      active={active}
      onClick={() => {
        setIsNext(false);
        mediaInfoDispatch({ type: "first", payload: { scene, mediaActive } });
      }}
    >
      <BiFirstPage />
    </IconDefault>
  );
};

export default ToFirst;
