import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styles from "./PartsBoxEF.module.css";

type PropsType = {
  nameEF: string;
  message: string;
  active: boolean;
  activeFunc: () => void;
  prevValFunc: () => void;
  nextValFunc: () => void;
  folderChange?: () => void;
};

const PartsBoxEF = (props: PropsType) => {
  const {
    nameEF,
    message,
    active,
    activeFunc,
    prevValFunc,
    nextValFunc,
    folderChange,
  } = props;

  return (
    <div className={styles["EF-box"]}>
      <div className={styles.controlEF}>
        <BsChevronLeft className={styles.iconSmall} onClick={prevValFunc} />
        <p onClick={folderChange}>{message}</p>
        <BsChevronRight className={styles.iconSmall} onClick={nextValFunc} />
      </div>
      <label>
        <span>{nameEF}</span>
        <input type="checkbox" checked={active} onChange={activeFunc} />
      </label>
    </div>
  );
};

export default PartsBoxEF;
