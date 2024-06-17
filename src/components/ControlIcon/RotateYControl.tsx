import styles from "./RotateYControl.module.css";
import { GiStarSwirl } from "react-icons/gi";
import { useScene } from "../../context/SceneContext";
import { useState } from "react";
import { useRotateY } from "../../context/RotateYContext";
import CheckBox from "./ControlParts/CheckBox";

const RotateYControl = () => {
  const [isTachie, setIsTachie] = useState<boolean>(false);
  const [isEffect, setIsEffect] = useState<boolean>(false);

  const { scene } = useScene();
  const { rotateYDispatch } = useRotateY();

  return (
    <div className={styles["rotateY-container"]}>
      <div className={styles.wrapper}>
        <CheckBox
          messageList={["立ち絵", "エフェクト"]}
          checkedList={[isTachie, isEffect]}
          changeFuncList={[
            () => setIsTachie((prev) => !prev),
            () => setIsEffect((prev) => !prev),
          ]}
          checkBoxSize="middle"
        />
      </div>
      <GiStarSwirl
        className={styles.icon}
        onClick={() =>
          rotateYDispatch({ type: scene, payload: { isTachie, isEffect } })
        }
      />
    </div>
  );
};

export default RotateYControl;
