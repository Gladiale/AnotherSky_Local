import styles from "./CardImageCG.module.css";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useMediaSize } from "../../context/ScreenContext";
import {
  useCardCharacterInfo,
  useCardCharacterState,
} from "../../context/CardCharacterContext";
import { useLayoutEffect } from "react";

type PropsType = {
  className: "cg-img" | "texture-img";
};

const CG = ({ className }: PropsType) => {
  const { mediaSize } = useMediaSize();
  const { mediaState } = useMediaInfo();
  const { isCharacter } = useCardCharacterState();
  const { characterInfo, characterInfoDispatch } = useCardCharacterInfo();

  useLayoutEffect(() => {
    if (characterInfo.file[1] === "") {
      characterInfoDispatch({ type: "init", payload: mediaState });
    }
  }, [isCharacter]);

  const imgUrl = isCharacter
    ? `/character/${characterInfo.folder[1]}/${characterInfo.file[1]}`
    : `/cg/${mediaState.folder.cg[1]}/${mediaState.file.cgFile[1]}`;

  return (
    <img
      className={styles[className]}
      src={imgUrl}
      style={{
        objectFit: mediaSize === "custom" ? "contain" : mediaSize,
        height: mediaSize === "contain" ? "100%" : "auto",
        width: "auto",
        maxHeight: mediaSize === "custom" ? "100dvh" : undefined,
        maxWidth: mediaSize === "custom" ? "65dvw" : undefined,
      }}
    />
  );
};

export default CG;
