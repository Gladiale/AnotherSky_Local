import { GiAbstract024 } from "react-icons/gi";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import IconDefault from "../Common/IconDefault";

const MirrorEffectControl = () => {
  const { effectState, effectStateDispatch } = useEffectState();

  return (
    <IconDefault
      anime={effectState.mirrorEffect && "anime-color"}
      onClick={() => effectStateDispatch({ type: "mirror" })}
    >
      <GiAbstract024 />
    </IconDefault>
  );
};

export default MirrorEffectControl;
