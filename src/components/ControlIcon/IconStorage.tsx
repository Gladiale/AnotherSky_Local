import { GiMimicChest } from "react-icons/gi";
import IconDefault from "../Common/IconDefault";

type PropsType = {
  handleIconStorage: () => void;
  className?: "anime-color" | "anime-scale" | false;
};

const IconStorage = ({ handleIconStorage, className }: PropsType) => {
  return (
    <IconDefault onClick={handleIconStorage} className={className}>
      <GiMimicChest />
      {/* <GiSnowman /> */}
    </IconDefault>
  );
};

export default IconStorage;
