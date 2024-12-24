import { GiAbstract024 } from "react-icons/gi";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import IconDefault from "../Common/IconDefault";

const MirrorEffectControl = () => {
  const { effectState, effectStateDispatch } = useEffectState();

  return (
    <IconDefault
      anime={effectState.mirror && "anime-color"}
      onClick={() => effectStateDispatch({ type: "active", payload: "mirror" })}
    >
      <GiAbstract024 />
    </IconDefault>
  );
};

export default MirrorEffectControl;
