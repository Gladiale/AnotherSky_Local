import { BiLastPage } from "react-icons/bi";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import IconDefault from "../Common/IconDefault";

const ToLast = () => {
  const { scene } = useScene();
  const { mediaInfoDispatch } = useMediaInfo();

  return (
    <IconDefault onClick={() => mediaInfoDispatch({ type: "last", payload: scene })}>
      <BiLastPage />
    </IconDefault>
  );
};

export default ToLast;
