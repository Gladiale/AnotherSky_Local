import styles from "./ImageEffectControl.module.css";
import { GiPrism } from "react-icons/gi";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import PartsBoxEF from "./ControlParts/PartsBoxEF";
import EffectBox from "./ControlParts/EffectBox";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import RadioBox from "./ControlParts/RadioBox";
import { EffectStateType } from "../../context/EffectState/effectStateInit";
import CheckBox from "./ControlParts/CheckBox";

const ImageEffectControl = () => {
  const { effectState, effectStateDispatch } = useEffectState();
  const { mediaState, mediaDispatch } = useMediaInfo();

  const condition: boolean =
    effectState.imageEF.activeImage ||
    effectState.imageEF.activeBlend ||
    effectState.filterEffect.dropShadow ||
    effectState.pixelEffect ||
    effectState.shakeEffect.active;

  const containState = {
    radioSpanList: effectState.imageEF.maxHeightFull
      ? ["左", "中", "右"]
      : ["上", "中", "下"],
    checkedList: effectState.imageEF.maxHeightFull ? [true] : [false],
  };

  const openCloseImgEF = () => {
    condition
      ? effectStateDispatch({ type: "imgEfMultiActive", payload: "closeAll" })
      : effectStateDispatch({ type: "imgEfMultiActive", payload: "openAll" });
  };

  const radioPosiChecked = {
    topRight: effectState.imageEF.position === "top-right",
    topLeft: effectState.imageEF.position === "top-left",
    center: effectState.imageEF.position === "center",
    bottomLeft: effectState.imageEF.position === "bottom-left",
    bottomRight: effectState.imageEF.position === "bottom-right",
  };

  const radioSizeChecked = {
    contain: effectState.imageEF.size === "contain",
    none: effectState.imageEF.size === "none",
    cover: effectState.imageEF.size === "cover",
  };

  const changeImgEfPosi = (posi: EffectStateType["imageEF"]["position"]) => {
    effectStateDispatch({ type: "imgEfPosi", payload: posi });
  };

  const changeImgEfSize = (size: EffectStateType["imageEF"]["size"]) => {
    effectStateDispatch({ type: "imgEfSize", payload: size });
  };

  return (
    <div className={styles["EF-container"]}>
      {condition && (
        <div className={styles["EF-wrapper"]}>
          <EffectBox />
          <PartsBoxEF
            nameEF="blendEF"
            message={effectState.imageEF.blendKind}
            active={effectState.imageEF.activeBlend}
            activeFunc={() =>
              effectStateDispatch({
                type: "imgEfSingleActive",
                payload: "blendActive",
              })
            }
            prevValFunc={() =>
              effectStateDispatch({ type: "imgEfKind", payload: "prev" })
            }
            nextValFunc={() =>
              effectStateDispatch({ type: "imgEfKind", payload: "next" })
            }
          />
          <PartsBoxEF
            nameEF="imageEF"
            message={mediaState.folder.effect[1]}
            active={effectState.imageEF.activeImage}
            activeFunc={() =>
              effectStateDispatch({
                type: "imgEfSingleActive",
                payload: "imageActive",
              })
            }
            prevValFunc={() => mediaDispatch({ type: "effectPrev" })}
            nextValFunc={() => mediaDispatch({ type: "effectNext" })}
            folderChange={() => mediaDispatch({ type: "effectFolderNext" })}
          />

          <div className={styles["radio-content"]}>
            {radioSizeChecked.contain && (
              <div className={styles["control-box"]}>
                <CheckBox
                  messageList={["高さ100%"]}
                  checkedList={containState.checkedList}
                  changeFuncList={[
                    () => effectStateDispatch({ type: "imgEfMaxHeight" }),
                  ]}
                  checkBoxSize="small"
                />
                <RadioBox
                  radioName="position"
                  radioSpanList={containState.radioSpanList}
                  radioCheckList={[
                    radioPosiChecked.topLeft,
                    radioPosiChecked.center,
                    radioPosiChecked.bottomRight,
                  ]}
                  radioChangeFuncList={[
                    () => changeImgEfPosi("top-left"),
                    () => changeImgEfPosi("center"),
                    () => changeImgEfPosi("bottom-right"),
                  ]}
                />
              </div>
            )}
            {radioSizeChecked.none && (
              <RadioBox
                radioName="position"
                radioSpanList={["左下", "左上", "中", "右上", "右下"]}
                radioCheckList={[
                  radioPosiChecked.bottomLeft,
                  radioPosiChecked.topLeft,
                  radioPosiChecked.center,
                  radioPosiChecked.topRight,
                  radioPosiChecked.bottomRight,
                ]}
                radioChangeFuncList={[
                  () => changeImgEfPosi("bottom-left"),
                  () => changeImgEfPosi("top-left"),
                  () => changeImgEfPosi("center"),
                  () => changeImgEfPosi("top-right"),
                  () => changeImgEfPosi("bottom-right"),
                ]}
              />
            )}
            <RadioBox
              // ここにsize書いちゃうと上手くレンダリングできなくなる
              radioName="sizeRadio"
              radioSpanList={["コンテイン", "オリジン", "カバー"]}
              radioCheckList={[
                radioSizeChecked.contain,
                radioSizeChecked.none,
                radioSizeChecked.cover,
              ]}
              radioChangeFuncList={[
                () => changeImgEfSize("contain"),
                () => changeImgEfSize("none"),
                () => changeImgEfSize("cover"),
              ]}
            />
          </div>
        </div>
      )}

      <GiPrism
        className={`${styles.icon} ${condition && styles.toggleState}`}
        onClick={openCloseImgEF}
      />
    </div>
  );
};

export default ImageEffectControl;
