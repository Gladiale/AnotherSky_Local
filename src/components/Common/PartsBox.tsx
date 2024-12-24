import styles from "./PartsBox.module.css";
import CheckBox from "./CheckBox";
import IconSmall from "./IconSmall";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type PropsType = {
  title?: string;
  message: string;
  onPrevClick: () => void;
  onNextClick: () => void;
  onBoxClick?: () => void;
  onBoxContextMenu?: () => void;
  checkBox?: {
    text: string;
    state: boolean;
    onChange: () => void;
  };
};

const PartsBox = (props: PropsType) => {
  const {
    title,
    message,
    onPrevClick,
    onNextClick,
    onBoxClick,
    onBoxContextMenu,
    checkBox,
  } = props;

  return (
    <div className={styles["parts-box"]}>
      {title && <p className={styles.title}>{title}</p>}

      <div className={styles["control"]}>
        <IconSmall children={<BsChevronLeft />} onClick={onPrevClick} />
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
        <IconSmall children={<BsChevronRight />} onClick={onNextClick} />
      </div>

      {checkBox && (
        <CheckBox
          kind="2nd"
          fontSize={1}
          checkBoxSize={0.8}
          gap={{
            outerGap: "0",
            innerGap: "0.3rem",
          }}
          checkBoxList={[
            {
              text: checkBox.text,
              state: checkBox.state,
              onChange: checkBox.onChange,
            },
          ]}
        />
      )}
    </div>
  );
};

export default PartsBox;
