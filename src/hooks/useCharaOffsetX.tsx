import { useEffect, useRef, useState } from "react";
import { useScene } from "../context/SceneContext";
import { useContentWidth } from "../context/OtherContext";
import { useMediaActive } from "../context/MediaInfoContext/MediaInfoContext";
import { useEffectState } from "../context/EffectStateContext/EffectStateContext";

const useContentChange = (
  loadStatus: "success" | "waiting" | "failed",
  target: "imgEl" | "videoEl" | "divEl",
  content: "main" | "chara"
) => {
  type ElementType<T extends typeof target> = {
    imgEl: HTMLImageElement;
    videoEl: HTMLVideoElement;
    divEl: HTMLDivElement;
  }[T];

  const { setContentWidth } = useContentWidth();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const targetRef = useRef<ElementType<typeof target>>(null!);

  const setLoadedTrue = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (loadStatus === "success" && isLoaded) {
      setContentWidth((prev) => ({
        ...prev,
        [content]: targetRef.current.offsetWidth,
      }));
      setIsLoaded(false);
    }
  }, [isLoaded, loadStatus]);

  return { targetRef, setLoadedTrue };
};

const useCharaOffsetX = () => {
  const { scene } = useScene();
  const { mediaActive } = useMediaActive();
  const { effectState } = useEffectState();
  const { contentWidth } = useContentWidth();
  const [offsetX, setOffsetX] = useState<number>(0);

  useEffect(() => {
    // ターゲットの占め範囲をwindowの18%に限定
    const overValue = contentWidth.chara - window.innerWidth * 0.18;
    const offsetLimit = overValue > 0 ? overValue : 0;

    if (mediaActive.doublePage || scene === "directoryMode") {
      const contentFullWidth = contentWidth.main + contentWidth.chara * 2;
      const offsetToSide = (contentFullWidth - window.innerWidth) / 2;
      const hasSpace: boolean =
        contentFullWidth - offsetToSide + offsetLimit > contentFullWidth;
      return offsetToSide > 0 && !hasSpace
        ? setOffsetX(offsetToSide - offsetLimit)
        : setOffsetX(0);
    }

    if (effectState.mirror) {
      const contentFullWidth = contentWidth.main + contentWidth.chara;
      const offsetToSide = contentFullWidth - window.innerWidth / 2;
      const haveSpace: boolean =
        contentFullWidth - offsetToSide + offsetLimit > contentFullWidth;
      return offsetToSide > 0 && !haveSpace
        ? setOffsetX(offsetToSide - offsetLimit)
        : setOffsetX(0);
    }

    setOffsetX(0);
  }, [contentWidth.main, contentWidth.chara, mediaActive.doublePage, effectState.mirror]);

  return { offsetX };
};

export { useContentChange, useCharaOffsetX };
