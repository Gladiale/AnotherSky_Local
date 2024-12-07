import styles from "./FlipBook.module.css";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useState } from "react";

type PropsType = {
  className: string;
  style?: React.CSSProperties;
  imgUrl: string;
  onClick?: () => void;
};

const PageContent = ({ className, style, imgUrl, onClick }: PropsType) => {
  const { appOption } = useAppOption();
  const { transform3d, changeTransform3d, resetTransform3d } = useTransform3d();

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
          }}
          onClick={onClick}
          onContextMenu={changeElementRotate}
          onMouseMove={appOption.parallax ? changeTransform3d : undefined}
          onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
        />
      </div>
    </div>
  );
};

export default PageContent;
