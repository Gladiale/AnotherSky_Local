import styles from "./RadioBox.module.css";

type PropsType = {
  responsive?: boolean;
  radioName: string;
  radioSpanList: string[];
  radioCheckList: boolean[];
  radioChangeFuncList: (() => void)[];
};

const RadioBox = (props: PropsType) => {
  const { radioName, radioSpanList, radioCheckList, radioChangeFuncList, responsive } =
    props;

  return (
    <div className={`${styles["radio-box"]} ${responsive && styles.responsive}`}>
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
