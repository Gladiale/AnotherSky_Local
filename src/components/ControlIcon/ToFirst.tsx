import { BiFirstPage } from "react-icons/bi";
import {
  useMediaActive,
  useMediaInfo,
} from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  active?: "onlyMobile" | "onlyDesk";
};

const ToFirst = ({ active }: PropsType) => {
  const { scene } = useScene();
  const { mediaActive } = useMediaActive();
  const { mediaInfoDispatch } = useMediaInfo();

  return (
    <IconDefault
      active={active}
      onClick={() =>
        mediaInfoDispatch({ type: "first", payload: { scene, mediaActive } })
      }
    >
      <BiFirstPage />
    </IconDefault>
  );
};

export default ToFirst;
