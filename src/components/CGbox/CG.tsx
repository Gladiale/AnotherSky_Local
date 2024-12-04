import styles from "./CGbox.module.css";
import { useLoading } from "../../hooks/useLoading";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useAnotherCharacter } from "../../context/MediaInfoContext/MediaInfoContext";
import Loading from "../Loading/Loading";

type PropsType = {
  className: "cg-img" | "texture-img";
};

const CG = ({ className }: PropsType) => {
  // コンテキスト
  const { appOption } = useAppOption();
  const { anotherActive } = useAnotherCharacter();
  // カスタムフック
  const { urlConfig } = useUrlConfig();
  const { mediaSizeData } = useMediaSizeData();

  const imgUrl = anotherActive ? urlConfig.anotherCharacter : urlConfig.cg;

  const { loadStatus, showTarget, showError } = useLoading({
    trigger: [anotherActive, imgUrl],
    target: "cg",
  });

  const { transform3d, changeTransform3d, resetTransform3d } = useTransform3d();

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
        }}
        onLoad={showTarget}
        onStalled={showError}
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
