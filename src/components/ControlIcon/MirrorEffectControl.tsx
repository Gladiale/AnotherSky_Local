import styles from "./Icon.module.css";
import { GiAbstract024 } from "react-icons/gi";
import { useEffectState } from "../../context/EffectState/EffectStateContext";

const MirrorEffectControl = () => {
  const { effectState, effectStateDispatch } = useEffectState();

  return (
    <GiAbstract024
      className={`${styles.icon} 
      ${effectState.mirrorEffect && styles.toggleState}`}
      onClick={() => effectStateDispatch({ type: "mirror" })}
    />
  );
};

export default MirrorEffectControl;
