import styles from "./ImageEffectControl.module.css";
import { GiPrism } from "react-icons/gi";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { EffectStateType } from "../../context/EffectState/effectStateInit";
import { useEffectControl } from "../../context/EffectControlContext";
import PartsBox from "../Common/PartsBox";
import EffectBox from "../Common/EffectBox";
import CheckBox from "../Common/CheckBox";
import RadioBox from "../Common/RadioBox";
import IconDefault from "../Common/IconDefault";

const ImageEffectControl = () => {
  const { effectState, effectStateDispatch } = useEffectState();
  const { mediaState, mediaDispatch } = useMediaInfo();
  const { triggerEditMode } = useEffectControl();

  const condition: boolean =
    effectState.imageEF.activeImage ||
    effectState.imageEF.activeBlend ||
    effectState.pixelEffect ||
    effectState.shakeEffect.active;

  const containState = {
    radioSpanList: effectState.imageEF.maxHeightFull
      ? ["左", "中", "右"]
      : ["上", "中", "下"],
    checkedList: effectState.imageEF.maxHeightFull ? [true] : [false],
  };

  const openCloseImgEF = (e: React.MouseEvent<HTMLDivElement>) => {
    condition
      ? (effectStateDispatch({ type: "imgEfMultiActive", payload: "closeAll" }),
        triggerEditMode(e, true))
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
          <PartsBox
            name2nd="blendEF"
            part2nd={true}
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
          <PartsBox
            name2nd="imageEF"
            part2nd={true}
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
                  changeFuncList={[() => effectStateDispatch({ type: "imgEfMaxHeight" })]}
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

      <IconDefault className={condition && "toggle"} onClick={openCloseImgEF}>
        <GiPrism />
      </IconDefault>
    </div>
  );
};

export default ImageEffectControl;
