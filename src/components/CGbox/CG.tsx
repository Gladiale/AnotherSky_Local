import styles from "./CGbox.module.css";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useLoading } from "../../hooks/useLoading";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useAnotherCharacter } from "../../context/MediaInfoContext/MediaInfoContext";
import Loading from "../Loading/Loading";

type PropsType = {
  className: "cg-img" | "texture-img";
};

const CG = ({ className }: PropsType) => {
  const { urlConfig } = useUrlConfig();
  const { anotherActive } = useAnotherCharacter();
  const { mediaSizeData } = useMediaSizeData();

  const imgUrl = anotherActive ? urlConfig.anotherCharacter : urlConfig.cg;

  const { loadStatus, showTarget, showError } = useLoading({
    trigger: [anotherActive, imgUrl],
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
        }}
        onLoad={showTarget}
        onStalled={showError}
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
