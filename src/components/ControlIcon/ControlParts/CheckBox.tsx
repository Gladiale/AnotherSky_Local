import styles from "./CheckBox.module.css";

type PropsType = {
  messageList: string[];
  checkedList: boolean[];
  changeFuncList: (() => void)[];
};

const CheckBox = (props: PropsType) => {
  const { messageList, checkedList, changeFuncList } = props;

  return (
    <div className={styles["check-box"]}>
      {messageList.map((message, index) => (
        <label key={index}>
          <input
            type="checkbox"
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
