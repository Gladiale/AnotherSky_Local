import styles from "./RadioBox.module.css";

type PropsType = {
  radioName: string;
  radioList: {
    text: string;
    state: boolean;
    onChange: () => void;
  }[];
  responsive?: boolean;
  containerStyle?: React.CSSProperties;
};

const RadioBox = (props: PropsType) => {
  const { responsive, radioName, radioList, containerStyle } = props;

  return (
    <div
      className={`${styles["radio-box"]} ${responsive && styles.responsive}`}
      style={containerStyle}
    >
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
