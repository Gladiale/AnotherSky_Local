import styles from "./CGbox.module.css";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useContentChange } from "../../hooks/useCharaOffsetX";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useMediaActive } from "../../context/MediaInfoContext/MediaInfoContext";
import { type MixBlendModeType } from "../../context/EffectStateContext/effectStateInit";
// components
import Loading from "../Loading/Loading";

type PropsType = {
  className?: "texture-img";
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
  });
  const { targetRef, setLoadedTrue } = useContentChange(loadStatus, "imgEl", "main");

  return (
    <>
      <img
        src={imgUrl}
        className={className ? styles[className] : undefined}
        style={{
          transition: "0.2s",
          mixBlendMode: mixBlendMode,
          width: mediaSizeData.width,
          height: mediaSizeData.height,
          maxWidth: mediaSizeData.maxWidth,
          maxHeight: mediaSizeData.maxHeight,
          objectFit: mediaSizeData.objectFit,
          display: loadStatus === "success" ? undefined : "none",
          transform: appOption.parallax ? transform3d : undefined,
          opacity:
            threeState.active.threeD && !threeState.active.background ? 0 : undefined,
        }}
        ref={targetRef as React.MutableRefObject<HTMLImageElement>}
        onLoad={() => (showTarget(), setLoadedTrue())}
        onMouseMove={appOption.parallax ? changeTransform3d : undefined}
        onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
      />
      {className !== "texture-img" && <Loading kind="main" loadStatus={loadStatus} />}
    </>
  );
};

export default CG;
