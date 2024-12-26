import styles from "./Control.module.css";
import { useEffect, useState } from "react";
import { useScene } from "../../context/SceneContext";
import { useScreenMode } from "../../context/ScreenContext";
import { useHover } from "../../context/HoverContext";
import { useWindowState } from "../../hooks/useWindowState";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";

import ToPrev from "../ControlIcon/ToPrev";
import ToNext from "../ControlIcon/ToNext";
import ToFirst from "../ControlIcon/ToFirst";
import ToLast from "../ControlIcon/ToLast";
import VoiceControl from "../ControlIcon/VoiceControl";
import ScreenControl from "../ControlIcon/ScreenControl";
import EffectControl from "../ControlIcon/EffectControl/EffectControl";
import MirrorEffectControl from "../ControlIcon/MirrorEffectControl";
import AutoNext from "../ControlIcon/AutoNext";
import ImageEffectControl from "../ControlIcon/ImageEffectControl";
import RandomControl from "../ControlIcon/RandomControl";
import ShowDirectory from "../ControlIcon/ShowDirectory";
import ShowListImage from "../ControlIcon/ShowListImage";
import RotateYControl from "../ControlIcon/RotateYControl";
import MobilePositionControl from "../ControlIcon/MobilePositionControl";
import MobileScaleControl from "../ControlIcon/MobileScaleControl";
import IconStorage from "../ControlIcon/IconStorage";
import IconListTriggerMobile from "../ControlIcon/IconListTriggerMobile";
import IconListTriggerDesk from "../ControlIcon/IconListTriggerDesk";
import CustomBox from "./CustomBox";
import Unknown from "../ControlIcon/Unknown";

const Control = () => {
  const { scene } = useScene();
  const { screenMode } = useScreenMode();
  const { appOption } = useAppOption();
  const { hoverDispatch } = useHover();
  const { isMobileSize } = useWindowState();
  const [deskBoxState, setDeskBoxState] = useState({ box: true, item1st: true });
  const [mobileBoxState, setMobileBoxState] = useState({ box: true, item1st: true });

  const handleIconStorage = () => {
    setDeskBoxState((prev) => ({ ...prev, box: !prev["box"] }));
  };

  const handleIconDesk = () => {
    setDeskBoxState((prev) => ({ ...prev, item1st: !prev["item1st"] }));
  };

  const handleIconMobile = () => {
    setMobileBoxState((prev) => ({ ...prev, item1st: !prev["item1st"] }));
  };

  useEffect(() => {
    isMobileSize
      ? setDeskBoxState((prev) => ({ ...prev, box: true, item1st: false }))
      : setDeskBoxState((prev) => ({ ...prev, box: true, item1st: true }));
  }, [isMobileSize]);

  useEffect(() => {
    if (isMobileSize && scene === "directoryMode" && screenMode === "cgMode") {
      setMobileBoxState((prev) => ({ ...prev, box: false }));
    }

    if (!isMobileSize && scene === "directoryMode") {
      setDeskBoxState((prev) => ({ ...prev, box: false }));
      setMobileBoxState((prev) => ({ ...prev, box: false }));
    }

    if (scene !== "directoryMode") {
      setDeskBoxState((prev) => ({ ...prev, box: true }));
      setMobileBoxState((prev) => ({ ...prev, box: true }));
    }
  }, [scene, screenMode]);

  return (
    <>
      {/* desk icon */}
      <div
        className={`${styles["desk-box"]} ${!deskBoxState.box && styles.hidden}
        ${appOption.dropShadow.icon && styles.shadow}`}
        onMouseEnter={() => hoverDispatch({ type: "icon", payload: "enter" })}
        onMouseLeave={() => hoverDispatch({ type: "icon", payload: "leave" })}
      >
        <div
          className={`${styles["desk-1st"]} ${!deskBoxState.item1st && styles.hidden}`}
        >
          <ToFirst />
          <ToPrev />
          <IconListTriggerDesk boxKey="1st" handleListTrigger={handleIconDesk} />
          <ToNext />
          <ToLast />
        </div>

        <div className={`${styles["desk-2nd"]} ${deskBoxState.item1st && styles.hidden}`}>
          <ScreenControl />
          <MirrorEffectControl />
          <Unknown />
          <VoiceControl />
          <ShowListImage />
          {isMobileSize ? (
            <ShowDirectory />
          ) : (
            <IconListTriggerDesk boxKey="2nd" handleListTrigger={handleIconDesk} />
          )}
          <RandomControl />
          <AutoNext />
          <RotateYControl />
          <EffectControl />
          <ImageEffectControl />
        </div>

        <CustomBox
          className={"desk"}
          style={deskBoxState.item1st ? undefined : { opacity: 0, scale: 0 }}
        />
      </div>

      {/* mobile icon */}
      <div
        className={`${styles["mobile-box"]} ${!mobileBoxState.box && styles.hidden}
        ${appOption.dropShadow.icon && styles.shadow}`}
        onMouseEnter={() => hoverDispatch({ type: "icon", payload: "enter" })}
        onMouseLeave={() => hoverDispatch({ type: "icon", payload: "leave" })}
      >
        <div
          className={`${styles["mobile-1st"]} 
          ${!mobileBoxState.item1st && styles.hidden}`}
        >
          <ToFirst active="onlyMobile" />
          <ToPrev active="onlyMobile" />
          <IconListTriggerMobile boxKey="1st" handleListTrigger={handleIconMobile} />
          <ToNext active="onlyMobile" />
          <ToLast active="onlyMobile" />
        </div>

        <div
          className={`${styles["mobile-2nd"]} ${mobileBoxState.item1st && styles.hidden}`}
        >
          <MobilePositionControl />
          <IconListTriggerMobile boxKey="2nd" handleListTrigger={handleIconMobile} />
          <MobileScaleControl />
        </div>

        <CustomBox
          className={"mobile"}
          style={mobileBoxState.item1st ? undefined : { opacity: 0, scale: 0 }}
        />
      </div>

      {/* 単独 icon */}
      <div
        className={`${styles["storage-box"]} 
        ${appOption.dropShadow.icon && styles.shadow}`}
        onMouseEnter={() => hoverDispatch({ type: "icon", payload: "enter" })}
        onMouseLeave={() => hoverDispatch({ type: "icon", payload: "leave" })}
      >
        {isMobileSize ? (
          <IconStorage handleIconStorage={handleIconStorage} />
        ) : (
          <ShowDirectory />
        )}
      </div>
    </>
  );
};

export default Control;
