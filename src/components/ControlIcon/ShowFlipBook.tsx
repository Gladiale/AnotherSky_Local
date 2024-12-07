import { GiChewedHeart } from "react-icons/gi";
import IconDefault from "../Common/IconDefault";
import { useScene } from "../../context/SceneContext";
import { useAnotherCharacter } from "../../context/MediaInfoContext/MediaInfoContext";

const ShowFlipBook = () => {
  const { scene, setScene } = useScene();
  const { anotherActive } = useAnotherCharacter();

  const changeScene = () => {
    if (scene != "flipBook") {
      setScene("flipBook");
    } else {
      if (anotherActive) {
        return setScene("anotherCharacter");
      }
      setScene("cg");
    }
  };

  return (
    <IconDefault onClick={changeScene}>
      <GiChewedHeart />
    </IconDefault>
  );
};

export default ShowFlipBook;
