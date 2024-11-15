import styles from "./CardImageCG.module.css";
import { useLayoutEffect } from "react";
import { useMediaSizeData } from "../../hooks/useMediaSizeData";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import {
  useCardCharacterInfo,
  useCardCharacterState,
} from "../../context/CardCharacterContext";
import Loading from "../Loading/Loading";
import useLoading from "../../hooks/useLoading";

type PropsType = {
  className: "cg-img" | "texture-img";
};

const CG = ({ className }: PropsType) => {
  const { mediaSizeData } = useMediaSizeData();
  const { mediaState } = useMediaInfo();
  const { isCharacter } = useCardCharacterState();
  const { characterInfo, characterInfoDispatch } = useCardCharacterInfo();

  const imgUrl = isCharacter
    ? `/character/${characterInfo.folder[1]}/${characterInfo.file[1]}`
    : `/cg/${mediaState.folder.cg[1]}/${mediaState.file.cgFile[1]}`;

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
      <Loading loadStatus={loadStatus} />
    </>
  );
};

export default CG;
