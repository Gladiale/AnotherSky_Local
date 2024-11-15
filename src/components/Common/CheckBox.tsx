import styles from "./CheckBox.module.css";

type PropsType = {
  messageList: string[];
  checkedList: boolean[];
  changeFuncList: (() => void)[];
  checkBoxSize: "small" | "middle" | "big";
};

const CheckBox = (props: PropsType) => {
  const { messageList, checkedList, changeFuncList, checkBoxSize } = props;

  return (
    <div className={styles["check-box"]}>
      {messageList.map((message, index) => (
        <label key={index}>
          <input
            type="checkbox"
            className={styles[checkBoxSize]}
            checked={checkedList[index]}
            onChange={changeFuncList[index]}
          />
          <span>{message}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
