import styles from "./CGbox.module.css";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useLoading } from "../../hooks/useLoading";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useAnotherCharacter } from "../../context/MediaInfoContext/MediaInfoContext";
import Loading from "../Loading/Loading";

type PropsType = {
  className: "cg-img" | "texture-img";
};

const CG = ({ className }: PropsType) => {
  const { urlConfig } = useUrlConfig();
  const { mediaSizeData } = useMediaSizeData();
  const { anotherActive } = useAnotherCharacter();

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
          transform: transform3d,
        }}
        onLoad={showTarget}
        onStalled={showError}
        onMouseMove={changeTransform3d}
        onMouseLeave={resetTransform3d}
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
