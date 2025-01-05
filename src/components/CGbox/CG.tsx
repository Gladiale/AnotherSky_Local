import styles from "./Transform3dBox.module.css";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
import { useMediaActive } from "../../context/MediaInfoContext/MediaInfoContext";
import { type MixBlendModeType } from "../../context/EffectStateContext/effectStateInit";
import Loading from "../Loading/Loading";

type PropsType = {
  className?: "texture-img";
  mixBlendMode?: MixBlendModeType;
};

const CG = ({ className, mixBlendMode }: PropsType) => {
  // コンテキスト
  const { threeState } = useThreeState();
  const { mediaActive } = useMediaActive();
  // カスタムフック
  const { urlConfig } = useUrlConfig();
  const { mediaSizeData } = useMediaSizeData();

  const imgUrl = mediaActive.anotherCharacter ? urlConfig.anotherCharacter : urlConfig.cg;
  const { loadStatus, showTarget } = useLoading({
    trigger: [mediaActive.anotherCharacter, imgUrl],
    target: "cg",
  });

  return (
    <>
      <img
        className={className ? styles[className] : undefined}
        src={imgUrl}
        style={{
          transition: "0.3s",
          objectFit: mediaSizeData.objectFit,
          height: mediaSizeData.height,
          width: mediaSizeData.width,
          maxHeight: mediaSizeData.maxHeight,
          maxWidth: mediaSizeData.maxWidth,
          display: loadStatus === "success" ? undefined : "none",
          mixBlendMode: mixBlendMode,
          opacity:
            threeState.active.threeD && !threeState.active.background ? 0 : undefined,
        }}
        onLoad={showTarget}
      />
      <Loading
        kind="1st"
        loadStatus={loadStatus}
        loadStyle={{ position: className === "texture-img" ? "absolute" : "relative" }}
      />
    </>
  );
};

export default CG;
