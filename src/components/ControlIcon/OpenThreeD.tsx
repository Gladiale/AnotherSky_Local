import { GiChewedHeart } from "react-icons/gi";
import IconDefault from "../Common/IconDefault";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
import { useScene } from "../../context/SceneContext";

const OpenThreeD = () => {
  const { scene, setScene } = useScene();
  const { threeState, threeStateDispatch } = useThreeState();

  const handleClick = () => {
    scene !== "cg" && !threeState.active.threeD && setScene("cg");
    threeStateDispatch({ type: "active", payload: "threeD" });
  };

  return (
    <IconDefault
      onClick={handleClick}
      anime={threeState.active.threeD && "anime-color-3rd"}
    >
      <GiChewedHeart />
    </IconDefault>
  );
};

export default OpenThreeD;
