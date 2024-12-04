import styles from "./RotateYControl.module.css";
import { GiStarSwirl } from "react-icons/gi";
import { useScene } from "../../context/SceneContext";
import { useState } from "react";
import { useRotateY } from "../../context/RotateYContext";
import CheckBox from "../Common/CheckBox";
import IconDefault from "../Common/IconDefault";

const RotateYControl = () => {
  const [isTachie, setIsTachie] = useState<boolean>(false);
  const [isEffect, setIsEffect] = useState<boolean>(false);

  const { scene } = useScene();
  const { rotateYDispatch } = useRotateY();

  return (
    <div className={styles["rotateY-container"]}>
      <div className={styles.wrapper}>
        <CheckBox
          kind="1st"
          responsive={true}
          checkBoxSize="middle"
          gap={{ outerGap: "0.4rem", innerGap: "0.1rem", responsiveGap: "0.2rem" }}
          messageList={["立ち絵", "エフェクト"]}
          checkedList={[isTachie, isEffect]}
          changeFuncList={[
            () => setIsTachie((prev) => !prev),
            () => setIsEffect((prev) => !prev),
          ]}
        />
      </div>

      <IconDefault
        children={<GiStarSwirl />}
        onClick={() => rotateYDispatch({ type: scene, payload: { isTachie, isEffect } })}
      />
    </div>
  );
};

export default RotateYControl;
