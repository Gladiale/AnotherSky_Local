import styles from "./CGbox.module.css";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useMediaActive } from "../../context/MediaInfoContext/MediaInfoContext";
import { type MixBlendModeType } from "../../context/EffectStateContext/effectStateInit";
import Loading from "../Loading/Loading";

type PropsType = {
  className: "cg-img" | "texture-img";
  mixBlendMode?: MixBlendModeType;
};

const CG = ({ className, mixBlendMode }: PropsType) => {
  // コンテキスト
  const { appOption } = useAppOption();
  const { threeState } = useThreeState();
  const { mediaActive } = useMediaActive();
  // カスタムフック
  const { urlConfig } = useUrlConfig();
  const { mediaSizeData } = useMediaSizeData();
  const { transform3d, changeTransform3d, resetTransform3d } = useTransform3d();

  const imgUrl = mediaActive.anotherCharacter ? urlConfig.anotherCharacter : urlConfig.cg;
  const { loadStatus, showTarget } = useLoading({
    trigger: [mediaActive.anotherCharacter, imgUrl],
    target: "cg",
  });

  return (
    <>
      <img
        className={styles[className]}
        src={imgUrl}
        style={{
          objectFit: mediaSizeData.objectFit,
          height: mediaSizeData.height,
          width: mediaSizeData.width,
          maxHeight: mediaSizeData.maxHeight,
          maxWidth: mediaSizeData.maxWidth,
          display: loadStatus === "success" ? undefined : "none",
          transform: appOption.parallax ? transform3d : undefined,
          mixBlendMode: mixBlendMode,
          opacity:
            threeState.active.threeD && !threeState.active.background ? 0 : undefined,
        }}
        onLoad={showTarget}
        onMouseMove={appOption.parallax ? changeTransform3d : undefined}
        onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
      />
      <Loading
        kind="1st"
        loadStatus={loadStatus}
        loadStyle={{ position: className === "cg-img" ? "relative" : "absolute" }}
      />
    </>
  );
};

export default CG;
