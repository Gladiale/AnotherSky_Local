import { useScene } from "../context/SceneContext";
import {
  useMediaInfo,
  useAnotherCharacter,
} from "../context/MediaInfoContext/MediaInfoContext";

const useMouseControl = (target: "cg" | "card" | "video") => {
  const { scene, setScene } = useScene();
  const { mediaInfoDispatch } = useMediaInfo();
  const { anotherActive } = useAnotherCharacter();

  // Targetにマウスの左クリック
  const changeScene = () => {
    if (anotherActive) {
      return setScene("anotherCharacter");
    }
    return setScene("cg");
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
      ? mediaInfoDispatch({ type: "next", payload: scene })
      : mediaInfoDispatch({ type: "prev", payload: scene });
  };

  return { changeScene, resetScene, changeMedia };
};

export { useMouseControl };
