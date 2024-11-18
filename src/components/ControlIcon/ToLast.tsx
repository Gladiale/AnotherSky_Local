import { BiLastPage } from "react-icons/bi";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  mobileHidden?: boolean;
};

const ToLast = ({ mobileHidden }: PropsType) => {
  const { scene } = useScene();
  const { mediaInfoDispatch } = useMediaInfo();

  return (
    <IconDefault
      mobileHidden={mobileHidden}
      onClick={() => mediaInfoDispatch({ type: "last", payload: scene })}
    >
      <BiLastPage />
    </IconDefault>
  );
};

export default ToLast;
