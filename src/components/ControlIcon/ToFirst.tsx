import { BiFirstPage } from "react-icons/bi";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import IconDefault from "../Common/IconDefault";

const ToFirst = () => {
  const { scene } = useScene();
  const { mediaInfoDispatch } = useMediaInfo();

  return (
    <IconDefault onClick={() => mediaInfoDispatch({ type: "first", payload: scene })}>
      <BiFirstPage />
    </IconDefault>
  );
};

export default ToFirst;
