import styles from "./RadioBox.module.css";

type PropsType = {
  responsive?: boolean;
  radioName: string;
  radioList: {
    text: string;
    state: boolean;
    onChange: () => void;
  }[];
};

const RadioBox = (props: PropsType) => {
  const { responsive, radioName, radioList } = props;

  return (
    <div className={`${styles["radio-box"]} ${responsive && styles.responsive}`}>
      {radioList.map((radio, index) => (
        <label key={index}>
          <input
            type="radio"
            name={radioName}
            checked={radio.state}
            onChange={radio.onChange}
          />
          <span>{radio.text}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioBox;
