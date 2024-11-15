import { BsChevronLeft } from "react-icons/bs";
import { useScene } from "../../context/SceneContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import {
  useCardCharacterInfo,
  useCardCharacterState,
} from "../../context/CardCharacterContext";
import IconDefault from "../Common/IconDefault";

const ToPrev = () => {
  const { scene } = useScene();
  const { mediaDispatch } = useMediaInfo();
  const { isCharacter } = useCardCharacterState();
  const { characterInfoDispatch } = useCardCharacterInfo();

  const toPrevImage = () => {
    isCharacter && scene === "card-cg"
      ? characterInfoDispatch({ type: "prev" })
      : mediaDispatch({ type: "prev", payload: scene });
  };

  const toPrevFolder = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    mediaDispatch({ type: "folderPrev", payload: scene });
  };

  return (
    <IconDefault onClick={toPrevImage} onContextMenu={toPrevFolder}>
      <BsChevronLeft />
    </IconDefault>
  );
};

export default ToPrev;
