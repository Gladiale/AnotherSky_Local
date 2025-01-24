import styles from "./PartsBox3rd.module.css";
import IconSmall from "./IconSmall";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GiRecycle } from "react-icons/gi";

type PropsType = {
  title?: string;
  message: string;
  onPrevClick: () => void;
  onNextClick: () => void;
  onFirstClick: () => void;
  onLastClick: () => void;
  onCenterClick: () => void;
  onBoxClick?: () => void;
  onBoxContextMenu?: () => void;
};

const PartsBox3rd = (props: PropsType) => {
  const {
    title,
    message,
    onPrevClick,
    onNextClick,
    onFirstClick,
    onLastClick,
    onCenterClick,
    onBoxClick,
    onBoxContextMenu,
  } = props;

  return (
    <div className={styles["parts-box"]}>
      {title && <p className={styles.title}>{title}</p>}

      <div className={styles["control"]}>
        <p
          className={`${styles["message"]} ${onBoxClick && styles.ani}`}
          onClick={onBoxClick}
          onContextMenu={(e) => {
            e.preventDefault();
            onBoxContextMenu && onBoxContextMenu();
          }}
        >
          {message}
        </p>

        <div className={styles["icon-box"]}>
          <div className={styles["item-box"]}>
            <IconSmall shape="rabbet" children={<BiFirstPage />} onClick={onFirstClick} />
            <IconSmall
              shape="rabbet"
              children={<BsChevronLeft />}
              onClick={onPrevClick}
            />
          </div>

          <IconSmall shape="rhombus" children={<GiRecycle />} onClick={onCenterClick} />

          <div className={styles["item-box"]}>
            <IconSmall
              shape="rabbet"
              children={<BsChevronRight />}
              onClick={onNextClick}
            />
            <IconSmall shape="rabbet" children={<BiLastPage />} onClick={onLastClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsBox3rd;
