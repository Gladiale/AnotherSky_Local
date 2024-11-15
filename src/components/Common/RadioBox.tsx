import styles from "./RadioBox.module.css";

type PropsType = {
  radioName: string;
  radioSpanList: string[];
  radioCheckList: boolean[];
  radioChangeFuncList: (() => void)[];
};

const RadioBox = (props: PropsType) => {
  const { radioName, radioSpanList, radioCheckList, radioChangeFuncList } =
    props;

  return (
    <div className={styles["radio-box"]}>
      {radioSpanList.map((radioSpan, index) => (
        <label key={index}>
          <input
            type="radio"
            name={radioName}
            checked={radioCheckList[index]}
            onChange={radioChangeFuncList[index]}
          />
          <span>{radioSpan}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioBox;
