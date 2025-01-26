import { useState } from "react";
import { useScene } from "../context/SceneContext";
import {
  useMediaInfo,
  useMediaActive,
} from "../context/MediaInfoContext/MediaInfoContext";

const useMouseControl = (target: "cg" | "card" | "video") => {
  const { scene, setScene } = useScene();
  const { mediaActive } = useMediaActive();
  const { mediaInfoDispatch } = useMediaInfo();
  const [isNext, setIsNext] = useState<boolean>(true);

  // Targetにマウスの左クリック
  const changeScene = () => {
    setScene("cg");
  };

  // Targetにマウスの右クリック
  const resetScene = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    target === "card" ? setScene("video") : setScene("card");
  };

  // Targetにマウスのホイル
  const changeMedia = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.deltaY > 0
      ? (setIsNext(true),
        mediaInfoDispatch({ type: "next", payload: { scene, mediaActive } }))
      : (setIsNext(false),
        mediaInfoDispatch({ type: "prev", payload: { scene, mediaActive } }));
  };

  return { isNext, changeScene, resetScene, changeMedia };
};

export { useMouseControl };
