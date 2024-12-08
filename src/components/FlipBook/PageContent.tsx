import styles from "./FlipBook.module.css";
import { useState } from "react";
import { useLoading } from "../../hooks/useLoading";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import Loading from "../Loading/Loading";

type PropsType = {
  className: string;
  style?: React.CSSProperties;
  imgUrl: string;
  onClick?: () => void;
};

const PageContent = ({ className, style, imgUrl, onClick }: PropsType) => {
  const { appOption } = useAppOption();
  const { effectState } = useEffectState();
  const { transform3d, changeTransform3d, resetTransform3d } = useTransform3d();

  const { loadStatus, showTarget } = useLoading({
    trigger: [imgUrl],
    target: "cg",
  });

  const [elementRotate, setElementRotate] = useState<boolean>(false);

  const changeElementRotate = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setElementRotate((prev) => !prev);
  };

  return (
    <div
      className={`${styles[className]} ${styles["page-content"]}`}
      style={{ ...style }}
    >
      <div
        className={styles["item-box"]}
        style={{ transform: `rotateY(${elementRotate ? 180 : 0}deg)` }}
      >
        <img
          alt="画像"
          src={imgUrl}
          className={styles["element"]}
          style={{
            transform: appOption.parallax ? transform3d : undefined,
            display: className.includes("cover")
              ? loadStatus === "success"
                ? undefined
                : "none"
              : undefined,
          }}
          onLoad={showTarget}
          onClick={onClick}
          onContextMenu={changeElementRotate}
          onMouseMove={appOption.parallax ? changeTransform3d : undefined}
          onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
        />
        {effectState.blendCG.active && effectState.filterEffect.targetCard && (
          <img
            alt="画像"
            src={imgUrl}
            className={`${styles["element"]} ${styles["texture"]}`}
            style={{
              transform: appOption.parallax ? transform3d : undefined,
              display: className.includes("cover")
                ? loadStatus === "success"
                  ? undefined
                  : "none"
                : undefined,
            }}
            onClick={onClick}
            onContextMenu={changeElementRotate}
            onMouseMove={appOption.parallax ? changeTransform3d : undefined}
            onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
          />
        )}
        {className.includes("cover") && <Loading kind="1st" loadStatus={loadStatus} />}
      </div>
    </div>
  );
};

export default PageContent;
