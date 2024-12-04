import styles from "./CheckBox.module.css";

type PropsType = {
  kind: "1st" | "2nd";
  fontSize?: string;
  responsive?: boolean;
  gap: {
    outerGap: string;
    innerGap: string;
    responsiveGap?: string;
  };
  messageList: string[];
  checkedList: boolean[];
  changeFuncList: (() => void)[];
  checkBoxSize: "small" | "middle" | "big";
};

const CheckBox = (props: PropsType) => {
  const {
    kind,
    gap,
    fontSize,
    responsive,
    checkBoxSize,
    messageList,
    checkedList,
    changeFuncList,
  } = props;

  return (
    <div
      className={`${styles["check-box"]} ${responsive && styles.column}`}
      style={{
        ["--outer-gap" as any]: gap.outerGap,
        ["--responsive-gap" as any]: gap.responsiveGap,
      }}
    >
      {messageList.map((message, index) => (
        <label key={index} style={{ gap: gap.innerGap }}>
          <input
            type="checkbox"
            checked={checkedList[index]}
            onChange={changeFuncList[index]}
            className={kind === "2nd" ? styles.kind2nd : undefined}
            style={{
              ["--checkbox-size" as any]:
                checkBoxSize === "small" ? 0.7 : checkBoxSize === "middle" ? 0.8 : 0.9,
            }}
          />
          <span
            style={{
              order: kind === "2nd" ? "-1" : undefined,
              fontSize: fontSize ? fontSize : "0.8rem",
            }}
          >
            {message}
          </span>
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
