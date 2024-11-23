import { GiMimicChest } from "react-icons/gi";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  handleIconStorage: () => void;
  anime?: "anime-color" | "anime-color-2nd" | "anime-scale" | false;
};

const IconStorage = ({ handleIconStorage, anime }: PropsType) => {
  return (
    <IconDefault onClick={handleIconStorage} anime={anime}>
      <GiMimicChest />
      {/* <GiSnowman /> */}
    </IconDefault>
  );
};

export default IconStorage;
