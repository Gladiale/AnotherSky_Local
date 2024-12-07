import { GiShatter } from "react-icons/gi";
import { useScene } from "../../context/SceneContext";
import IconDefault from "../Common/IconDefault";

const ToHome = () => {
  const { setScene } = useScene();

  return (
    <IconDefault
      onClick={() => {
        setScene("card");
      }}
    >
      <GiShatter />
    </IconDefault>
  );
};

export default ToHome;
