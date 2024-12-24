import { useEffect, useState } from "react";
import { useMediaActive } from "../context/MediaInfoContext/MediaInfoContext";
import { useEffectState } from "../context/EffectStateContext/EffectStateContext";

const useCharaOffsetX = () => {
  const { mediaActive } = useMediaActive();
  const { effectState } = useEffectState();

  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetLimit, setOffsetLimit] = useState<number>(0);
  const [contentWidth, setContentWidth] = useState<number>(0);

  const handleContentWidth = (e: React.SyntheticEvent<HTMLDivElement>) => {
    setContentWidth(e.currentTarget.offsetWidth);
  };

  const handleOverLimit = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // ターゲットの占め範囲をwindowの18%に限定
    const overValue = e.currentTarget.offsetWidth - window.innerWidth * 0.18;
    overValue > 0 ? setOffsetLimit(overValue) : setOffsetLimit(0);
  };

  useEffect(() => {
    if (mediaActive.doublePage) {
      return contentWidth > window.innerWidth
        ? setOffsetX((contentWidth - window.innerWidth) / 2 - offsetLimit)
        : setOffsetX(0);
    }
    if (effectState.mirror) {
      const offset = contentWidth - window.innerWidth / 2;
      return offset > 0 ? setOffsetX(offset - offsetLimit) : setOffsetX(0);
    }
    setOffsetX(0);
  }, [contentWidth, mediaActive.doublePage, effectState.mirror]);

  return { offsetX, handleContentWidth, handleOverLimit };
};

export { useCharaOffsetX };
