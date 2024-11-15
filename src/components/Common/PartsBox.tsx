import IconSmall from "./IconSmall";
import styles from "./PartsBox.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type PropsType = {
  part2nd?: boolean;
  name2nd?: string;
  active?: boolean;
  activeFunc?: () => void;
  message: string;
  prevValFunc: () => void;
  nextValFunc: () => void;
  folderChange?: () => void;
};

const PartsBox = (props: PropsType) => {
  const {
    part2nd,
    name2nd,
    active,
    activeFunc,
    message,
    prevValFunc,
    nextValFunc,
    folderChange,
  } = props;

  return (
    <div className={styles["parts-box"]}>
      <div className={styles["control"]}>
        <IconSmall children={<BsChevronLeft />} onClick={prevValFunc} />
        <p onClick={folderChange}>{message}</p>
        <IconSmall children={<BsChevronRight />} onClick={nextValFunc} />
      </div>
      {part2nd && (
        <label>
          <span>{name2nd}</span>
          <input type="checkbox" checked={active} onChange={activeFunc} />
        </label>
      )}
    </div>
  );
};

export default PartsBox;
