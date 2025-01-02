import styles from "./PartsBox2nd.module.css";
import IconSmall from "./IconSmall";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

type PropsType = {
  title?: string;
  message: string;
  onPrevClick: () => void;
  onNextClick: () => void;
  onFirstClick: () => void;
  onLastClick: () => void;
  onBoxClick?: () => void;
  onBoxContextMenu?: () => void;
};

const PartsBox2nd = (props: PropsType) => {
  const {
    title,
    message,
    onPrevClick,
    onNextClick,
    onFirstClick,
    onLastClick,
    onBoxClick,
    onBoxContextMenu,
  } = props;

  return (
    <div className={styles["parts-box"]}>
      {title && <p className={styles.title}>{title}</p>}

      <div className={styles["control"]}>
        <IconSmall theme="theme-2nd" children={<BiFirstPage />} onClick={onFirstClick} />
        <IconSmall theme="theme-2nd" children={<BsChevronLeft />} onClick={onPrevClick} />
        <p
          className={onBoxClick && styles.ani}
          onClick={onBoxClick}
          onContextMenu={(e) => {
            e.preventDefault();
            onBoxContextMenu && onBoxContextMenu();
          }}
        >
          {message}
        </p>
        <IconSmall
          theme="theme-2nd"
          children={<BsChevronRight />}
          onClick={onNextClick}
        />
        <IconSmall theme="theme-2nd" children={<BiLastPage />} onClick={onLastClick} />
      </div>
    </div>
  );
};

export default PartsBox2nd;
