import { GiDiamondHilt } from "react-icons/gi";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
import IconDefault from "../Common/IconDefault";

const OpenThreeControl = () => {
  const { threeStateDispatch } = useThreeState();

  return (
    <IconDefault
      onClick={() => threeStateDispatch({ type: "active", payload: "controlPanel" })}
    >
      <GiDiamondHilt />
    </IconDefault>
  );
};

export default OpenThreeControl;
