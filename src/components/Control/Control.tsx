import styles from "./Control.module.css";
import { useEffect, useState } from "react";
import { useHover } from "../../context/HoverContext";
import { useWindowState } from "../../hooks/useWindowState";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";

import ToPrev from "../ControlIcon/ToPrev";
import ToNext from "../ControlIcon/ToNext";
import ToFirst from "../ControlIcon/ToFirst";
import ToLast from "../ControlIcon/ToLast";
import VoiceControl from "../ControlIcon/VoiceControl";
import ScreenControl from "../ControlIcon/ScreenControl";
import FilterControl from "../ControlIcon/FilterControl";
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
  const { hoverDispatch } = useHover();
  const { appOption } = useAppOption();
  const { isMobileSize } = useWindowState();
  const [deskIconState, setDeskIconState] = useState({ deskBox: true, desk1st: true });
  const [isMobile1stHidden, setIsMobile1stHidden] = useState<boolean>(false);

  const handleIconStorage = () => {
    setDeskIconState((prev) => ({ ...prev, deskBox: !prev["deskBox"] }));
  };

  const handleIconDesk = () => {
    setDeskIconState((prev) => ({ ...prev, desk1st: !prev["desk1st"] }));
  };

  const handleIconMobile = () => {
    setIsMobile1stHidden((prev) => !prev);
  };

  useEffect(() => {
    isMobileSize
      ? setDeskIconState((prev) => ({ ...prev, desk1st: false }))
      : setDeskIconState((prev) => ({ ...prev, deskBox: true, desk1st: true }));
  }, [isMobileSize]);

  return (
    <>
      {/* desk icon */}
      <div
        className={`${styles["desk-box"]} ${appOption.dropShadow.icon && styles.shadow}
        ${!deskIconState.deskBox && styles.hidden}`}
        onMouseEnter={() => hoverDispatch({ type: "icon", payload: "enter" })}
        onMouseLeave={() => hoverDispatch({ type: "icon", payload: "leave" })}
      >
        <div
          className={`${styles["desk-1st"]} ${!deskIconState.desk1st && styles.hidden}`}
        >
          <ToFirst />
          <ToPrev />
          <IconListTriggerDesk boxKey="1st" handleListTrigger={handleIconDesk} />
          <ToNext />
          <ToLast />
        </div>

        <div
          className={`${styles["desk-2nd"]} ${deskIconState.desk1st && styles.hidden}`}
        >
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
          <FilterControl />
          <ImageEffectControl />
        </div>

        {/* deskのCustomBox */}
        <CustomBox
          className={"desk"}
          style={deskIconState.desk1st ? {} : { opacity: 0, scale: 0 }}
        />
      </div>

      {/* mobileのCustomBox */}
      <CustomBox
        className={"mobile"}
        style={
          deskIconState.deskBox && !isMobile1stHidden
            ? {
                filter: appOption.dropShadow.icon
                  ? "var(--drop-shadow-hover)"
                  : undefined,
              }
            : { opacity: 0, scale: 0 }
        }
      />

      {/* mobile icon */}
      <div
        className={`${styles["mobile-box-1st"]}
        ${appOption.dropShadow.icon && styles.shadow}
        ${isMobile1stHidden && styles.hidden}`}
        onMouseEnter={() => hoverDispatch({ type: "icon", payload: "enter" })}
        onMouseLeave={() => hoverDispatch({ type: "icon", payload: "leave" })}
      >
        <ToFirst active="onlyMobile" />
        <ToPrev active="onlyMobile" />
        <IconListTriggerMobile boxKey="1st" handleListTrigger={handleIconMobile} />
        <ToNext active="onlyMobile" />
        <ToLast active="onlyMobile" />
      </div>

      <div
        className={`${styles["mobile-box-2nd"]}
        ${appOption.dropShadow.icon && styles.shadow}
        ${!isMobile1stHidden && styles.hidden}`}
        onMouseEnter={() => hoverDispatch({ type: "icon", payload: "enter" })}
        onMouseLeave={() => hoverDispatch({ type: "icon", payload: "leave" })}
      >
        <MobilePositionControl />
        <IconListTriggerMobile boxKey="2nd" handleListTrigger={handleIconMobile} />
        <MobileScaleControl />
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
