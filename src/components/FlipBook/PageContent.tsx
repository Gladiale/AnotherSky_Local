import styles from "./FlipBook.module.css";
import { useState } from "react";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useScene } from "../../context/SceneContext";

type PropsType = {
  className: string;
  style?: React.CSSProperties;
  url: string;
  onClick?: () => void;
};

const PageContent = ({ className, style, url, onClick }: PropsType) => {
  const { appOption } = useAppOption();
  const { scene } = useScene();
  const { effectState } = useEffectState();
  const { transform3d, changeTransform3d, resetTransform3d } = useTransform3d();

  const [elementRotate, setElementRotate] = useState<boolean>(false);

  const changeElementRotate = (
    e: React.MouseEvent<HTMLImageElement | HTMLVideoElement>,
  ) => {
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
        {scene === "video" ? (
          <video
            loop
            autoPlay
            playsInline
            controls={false}
            src={url}
            className={styles["element"]}
            style={{ transform: appOption.parallax ? transform3d : undefined }}
            onClick={onClick}
            onContextMenu={changeElementRotate}
            onMouseMove={appOption.parallax ? changeTransform3d : undefined}
            onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
          ></video>
        ) : (
          <>
            <img
              alt="画像"
              src={url}
              className={styles["element"]}
              style={{ transform: appOption.parallax ? transform3d : undefined }}
              onClick={onClick}
              onContextMenu={changeElementRotate}
              onMouseMove={appOption.parallax ? changeTransform3d : undefined}
              onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
            />
            {effectState.cgMix.active && effectState.target.cg && (
              <img
                alt="画像"
                src={url}
                className={`${styles["element"]} ${styles["texture"]}`}
                style={{
                  transform: appOption.parallax ? transform3d : undefined,
                  mixBlendMode: effectState.cgMix.mixMode,
                }}
                onClick={onClick}
                onContextMenu={changeElementRotate}
                onMouseMove={appOption.parallax ? changeTransform3d : undefined}
                onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PageContent;
