import { BiFirstPage } from "react-icons/bi";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import IconDefault from "../Common/IconDefault";

const ToFirst = () => {
  const { scene } = useScene();
  const { mediaDispatch } = useMediaInfo();

  return (
    <IconDefault onClick={() => mediaDispatch({ type: "first", payload: scene })}>
      <BiFirstPage />
    </IconDefault>
  );
};

export default ToFirst;
