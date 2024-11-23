import { BiFirstPage } from "react-icons/bi";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  active?: "onlyMobile" | "onlyDesk";
};

const ToFirst = ({ active }: PropsType) => {
  const { scene } = useScene();
  const { mediaInfoDispatch } = useMediaInfo();

  return (
    <IconDefault
      active={active}
      onClick={() => mediaInfoDispatch({ type: "first", payload: scene })}
    >
      <BiFirstPage />
    </IconDefault>
  );
};

export default ToFirst;
