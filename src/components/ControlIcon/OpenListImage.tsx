import styles from "./OpenListImage.module.css";
import { GiNewBorn } from "react-icons/gi";
import { useScene } from "../../context/SceneContext";
import { type ImageListType, useImageList } from "../../context/ImageListState";
// components
import RadioBox from "../Common/RadioBox";
import CheckBox from "../Common/CheckBox";
import IconDefault from "../Common/IconDefault";

const OpenListImage = () => {
  const { scene, setScene } = useScene();
  const { listState, setListState } = useImageList();

  const changeState = (target: keyof ImageListType, value?: ImageListType["target"]) => {
    if (target === "target") {
      value && setListState((prev) => ({ ...prev, target: value }));
    } else {
      setListState((prev) => ({ ...prev, [target]: !prev[target] }));
    }
  };

  const changeScene = () => {
    if (scene != "listImg") {
      setScene("listImg");
    } else {
      // setListState((prev) => ({ ...prev, random: !prev.random }));
      setScene("cg");
    }
  };

  return (
    <div className={styles["showList-container"]}>
      <IconDefault children={<GiNewBorn />} onClick={changeScene} />
      <div className={styles["target-box"]}>
        <div className={styles["otherAction"]}>
          <CheckBox
            kind="2nd"
            gap={{
              outerGap: "0.4rem",
              innerGap: "0.2rem",
            }}
            fontSize={0.9}
            checkBoxSize={0.8}
            containerStyle={{ lineHeight: "1rem" }}
            checkBoxList={[
              {
                text: "高さAuto",
                state: listState.heightAuto,
                onChange: () => changeState("heightAuto"),
              },
              {
                text: "Mode2",
                state: listState.mode2,
                onChange: () => changeState("mode2"),
              },
            ]}
          />
        </div>

        <CheckBox
          kind="2nd"
          gap={{
            outerGap: "0.4rem",
            innerGap: "0.2rem",
          }}
          fontSize={0.9}
          checkBoxSize={0.8}
          containerStyle={{ lineHeight: "1rem" }}
          checkBoxList={[
            {
              text: "Folder乱数",
              state: listState.folder,
              onChange: () => changeState("folder"),
            },
          ]}
        />

        <RadioBox
          radioName="target"
          radioList={[
            {
              text: "画像",
              state: listState.target === "cg",
              onChange: () => changeState("target", "cg"),
            },
            {
              text: "立ち絵",
              state: listState.target === "chara",
              onChange: () => changeState("target", "chara"),
            },
          ]}
          containerStyle={{ lineHeight: "1rem" }}
        />
      </div>
    </div>
  );
};

export default OpenListImage;
