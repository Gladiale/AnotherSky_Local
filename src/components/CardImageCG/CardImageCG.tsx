import styles from "./CardImageCG.module.css";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import CG from "./CG";
import EffectImage from "../EffectImage/EffectImage";
import ControlParts from "./ControlParts/ControlParts";
import { useMediaSize } from "../../context/ScreenContext";

type PropsType = {
  isPictureMode: boolean;
  setIsPictureMode: React.Dispatch<React.SetStateAction<boolean>>;
  pictureScale: number;
  setPictureScale: React.Dispatch<React.SetStateAction<number>>;
  picturePosition: { x: number; y: number };
  setPicturePosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
};

const CardImageCG = ({ data }: { data: PropsType }) => {
  const {
    isPictureMode,
    setIsPictureMode,
    pictureScale,
    setPictureScale,
    // picturePosition,
    setPicturePosition,
  } = data;

  const { effectState } = useEffectState();
  const { mediaSize } = useMediaSize();

  const triggerPictureMode = (e: any) => {
    if (e.button === 1) {
      setIsPictureMode((prev) => !prev);
      setPicturePosition({
        x: 0,
        y: 0,
      });
      setPictureScale(1.5);
    }
  };

  const enterPictureMode = (e: any) => {
    if (isPictureMode) {
      const maxMoveX =
        (e.target.clientWidth * pictureScale - e.target.clientWidth) / 2;
      const maxMoveY =
        (e.target.clientHeight * pictureScale - e.target.clientHeight) / 2;

      const positionX: number =
        -(
          Math.floor(e.nativeEvent.layerX - e.target.clientWidth / 2) /
          e.target.clientWidth
        ) * maxMoveX;
      const positionY: number =
        -(
          Math.floor(e.nativeEvent.layerY - e.target.clientHeight / 2) /
          e.target.clientHeight
        ) * maxMoveY;

      setPicturePosition({
        x: positionX,
        y: positionY,
      });
    }
  };

  const changeScale = (e: React.WheelEvent) => {
    if (isPictureMode) {
      if (e.deltaY > 0) {
        setPictureScale((prev) => Number((prev - 0.1).toFixed(1)));
      } else {
        setPictureScale((prev) => Number((prev + 0.1).toFixed(1)));
      }
    }
  };

  const shakeCondition = {
    low:
      effectState.shakeEffect.active && effectState.shakeEffect.heavy === "low",
    normal:
      effectState.shakeEffect.active &&
      effectState.shakeEffect.heavy === "normal",
    high:
      effectState.shakeEffect.active &&
      effectState.shakeEffect.heavy === "high",
  };

  return (
    <div
      className={`${styles["img-box"]}
      ${shakeCondition.low ? styles.shakeLow : ""}
      ${shakeCondition.normal ? styles.shakeNormal : ""}
      ${shakeCondition.high ? styles.shakeHigh : ""}
      `}
    >
      <div
        className={styles["blendMode"]}
        onMouseDown={triggerPictureMode}
        onMouseMove={enterPictureMode}
        onWheel={changeScale}
        style={{
          height: mediaSize === "contain" ? undefined : "fit-content",
        }}
      >
        <CG className="cg-img" />
        {effectState.blendCG.active && effectState.filterEffect.targetCard && (
          <CG className="texture-img" />
        )}
        {effectState.imageEF.activeImage && <EffectImage />}
      </div>

      <ControlParts />
    </div>
  );
};

export default CardImageCG;
