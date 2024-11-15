import styles from "./CheckBox.module.css";

type PropsType = {
  messageList: string[];
  checkedList: boolean[];
  changeFuncList: (() => void)[];
  checkBoxSize: "small" | "middle" | "big";
};

const CheckBox2nd = (props: PropsType) => {
  const { messageList, checkedList, changeFuncList, checkBoxSize } = props;

  return (
    <div className={`${styles["check-box"]} ${styles.type2}`}>
      {messageList.map((message, index) => (
        <label key={index}>
          <span>{message}</span>
          <input
            type="checkbox"
            className={styles[checkBoxSize]}
            checked={checkedList[index]}
            onChange={changeFuncList[index]}
          />
        </label>
      ))}
    </div>
  );
};

export default CheckBox2nd;
