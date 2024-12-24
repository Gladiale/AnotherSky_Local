import styles from "./CheckBox.module.css";

type PropsType = {
  kind: "1st" | "2nd";
  gap: {
    outerGap: string;
    innerGap: string;
    responsiveGap?: string;
  };
  fontSize: number;
  checkBoxSize: number;
  checkBoxList: {
    text: string;
    state: boolean;
    onChange: () => void;
  }[];
  responsive?: boolean;
  containerStyle?: React.CSSProperties;
};

const CheckBox = (props: PropsType) => {
  const { kind, gap, fontSize, responsive, checkBoxSize, checkBoxList, containerStyle } =
    props;

  return (
    <div
      className={`${styles["check-box"]} ${responsive && styles.column}`}
      style={{
        ["--outer-gap" as any]: gap.outerGap,
        ["--responsive-gap" as any]: gap.responsiveGap,
        ...containerStyle,
      }}
    >
      {checkBoxList.map((item, index) => (
        <label key={index} style={{ gap: gap.innerGap }}>
          <input
            type="checkbox"
            checked={item.state}
            onChange={item.onChange}
            className={kind === "2nd" ? styles.kind2nd : undefined}
            style={{
              ["--checkbox-size" as any]: checkBoxSize,
            }}
          />
          <span
            style={{
              order: kind === "2nd" ? "-1" : undefined,
              fontSize: `${fontSize}rem`,
            }}
          >
            {item.text}
          </span>
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
