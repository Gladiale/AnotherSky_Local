import styles from "./ImageEffectControl.module.css";
import { GiPrism } from "react-icons/gi";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useMediaControl } from "../../hooks/useMediaControl";
import PartsBox from "../Common/PartsBox";
import CheckBox from "../Common/CheckBox";
import RadioBox from "../Common/RadioBox";
import IconDefault from "../Common/IconDefault";

const ImageEffectControl = () => {
  const { effectState, effectStateDispatch } = useEffectState();
  const { mediaInfo, mediaInfoDispatch } = useMediaInfo();
  const { triggerEditMode } = useMediaControl({ initialScale: 1, target: "effect" });

  const openCloseImgEF = (e: React.MouseEvent<HTMLDivElement>) => {
    effectState.image.active
      ? (effectStateDispatch({ type: "active", payload: "image" }),
        triggerEditMode(e, true))
      : effectStateDispatch({ type: "active", payload: "image" });
  };

  const radioSizeChecked = {
    contain: effectState.image.size === "contain",
    none: effectState.image.size === "none",
    cover: effectState.image.size === "cover",
  };

  return (
    <div className={styles["EF-container"]}>
      {effectState.image.active && (
        <div className={styles["EF-wrapper"]}>
          <PartsBox
            title="MixEffect"
            message={effectState.image.mixMode}
            onPrevClick={() =>
              effectStateDispatch({
                type: "mix",
                payload: {
                  target: "image",
                  changeKey: "prev",
                },
              })
            }
            onNextClick={() =>
              effectStateDispatch({
                type: "mix",
                payload: {
                  target: "image",
                  changeKey: "next",
                },
              })
            }
            onBoxClick={() => {
              effectStateDispatch({
                type: "mixSpecific",
                payload: "image",
              });
            }}
          />
          <PartsBox
            title="EffectFile"
            message={mediaInfo.folder.effect[1]}
            onPrevClick={() => mediaInfoDispatch({ type: "effectPrev" })}
            onNextClick={() => mediaInfoDispatch({ type: "effectNext" })}
            onBoxClick={() => mediaInfoDispatch({ type: "effectFolderNext" })}
            onBoxContextMenu={() => mediaInfoDispatch({ type: "effectFolderPrev" })}
          />

          <div className={styles["radio-content"]}>
            {radioSizeChecked.contain && (
              <div className={styles["control-box"]}>
                <CheckBox
                  kind="1st"
                  fontSize={0.9}
                  checkBoxSize={0.7}
                  gap={{ outerGap: "0", innerGap: "0.1rem" }}
                  checkBoxList={[
                    {
                      text: "高さ100%",
                      state: effectState.image.maxHeightFull,
                      onChange: () => effectStateDispatch({ type: "imageMaxHeight" }),
                    },
                  ]}
                />
              </div>
            )}
            <RadioBox
              // ここにsize書いちゃうと上手くレンダリングできなくなる
              radioName="sizeRadio"
              radioList={[
                {
                  text: "コンテイン",
                  state: radioSizeChecked.contain,
                  onChange: () =>
                    effectStateDispatch({ type: "imageSize", payload: "contain" }),
                },
                {
                  text: "オリジン",
                  state: radioSizeChecked.none,
                  onChange: () =>
                    effectStateDispatch({ type: "imageSize", payload: "none" }),
                },
                {
                  text: "カバー",
                  state: radioSizeChecked.cover,
                  onChange: () =>
                    effectStateDispatch({ type: "imageSize", payload: "cover" }),
                },
              ]}
            />
          </div>
        </div>
      )}

      <IconDefault
        anime={effectState.image.active && "anime-color"}
        onClick={openCloseImgEF}
      >
        <GiPrism />
      </IconDefault>
    </div>
  );
};

export default ImageEffectControl;
