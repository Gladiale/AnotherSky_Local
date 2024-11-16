import styles from "./CGbox.module.css";
import { useLayoutEffect } from "react";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useLoading } from "../../hooks/useLoading";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import {
  useCardCharacterInfo,
  useCardCharacterState,
} from "../../context/CardCharacterContext";
import Loading from "../Loading/Loading";

type PropsType = {
  className: "cg-img" | "texture-img";
};

const CG = ({ className }: PropsType) => {
  const { mediaSizeData } = useMediaSizeData();
  const { mediaState } = useMediaInfo();
  const { isCharacter } = useCardCharacterState();
  const { urlConfig } = useUrlConfig();
  const { characterInfo, characterInfoDispatch } = useCardCharacterInfo();

  const imgUrl = isCharacter ? urlConfig.cardCharacter : urlConfig.cg;

  const { loadStatus, showTarget, showError } = useLoading({
    trigger: [isCharacter, imgUrl],
    target: "cg",
  });

  useLayoutEffect(() => {
    if (characterInfo.file[1] === "") {
      characterInfoDispatch({ type: "init", payload: mediaState });
    }
  }, [isCharacter]);

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
        loadStatus={loadStatus}
        loadStyle={{ position: className === "cg-img" ? "relative" : "absolute" }}
      />
    </>
  );
};

export default CG;
