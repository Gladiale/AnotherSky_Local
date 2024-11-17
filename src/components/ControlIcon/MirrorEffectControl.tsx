import { GiAbstract024 } from "react-icons/gi";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import IconDefault from "../Common/IconDefault";

const MirrorEffectControl = () => {
  const { effectState, effectStateDispatch } = useEffectState();

  return (
    <IconDefault
      className={effectState.mirrorEffect && "anime-color"}
      onClick={() => effectStateDispatch({ type: "mirror" })}
    >
      <GiAbstract024 />
    </IconDefault>
  );
};

export default MirrorEffectControl;
