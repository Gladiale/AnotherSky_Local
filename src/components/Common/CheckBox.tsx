import styles from "./CheckBox.module.css";

type PropsType = {
  responsive?: boolean;
  kind?: "2nd";
  messageList: string[];
  checkedList: boolean[];
  changeFuncList: (() => void)[];
  checkBoxSize: "small" | "middle" | "big";
};

const CheckBox = (props: PropsType) => {
  const { messageList, checkedList, changeFuncList, checkBoxSize, responsive, kind } =
    props;

  return (
    <div className={`${styles["check-box"]} ${responsive && styles.column}`}>
      {messageList.map((message, index) => (
        <label key={index}>
          <input
            type="checkbox"
            className={styles[checkBoxSize]}
            checked={checkedList[index]}
            onChange={changeFuncList[index]}
          />
          <span
            style={{
              order: kind === "2nd" ? "-1" : undefined,
              fontSize: kind === "2nd" ? "0.9rem" : "0.8rem",
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
