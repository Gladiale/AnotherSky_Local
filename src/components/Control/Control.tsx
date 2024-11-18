import styles from "./Control.module.css";
import { useState } from "react";
import { useHover } from "../../context/HoverContext";
import { useAppOption } from "../../context/AppOptionContext";

import FullScreen from "../ControlIcon/FullScreen";
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
import ShowListImage from "../ControlIcon/ShowListImage";
import Unknown from "../ControlIcon/Unknown";
import RotateYControl from "../ControlIcon/RotateYControl";
import MobilePositionControl from "../ControlIcon/MobilePositionControl";
import MobileScaleControl from "../ControlIcon/MobileScaleControl";
import IconStorage from "../ControlIcon/IconStorage";
import MobileIconListTrigger from "../ControlIcon/MobileIconListTrigger";

const Control = () => {
  const { setIsHovered } = useHover();
  const { optionData } = useAppOption();
  const [isMainHidden, setIsMainHidden] = useState<boolean>(false);
  const [isMobile1stHidden, setIsMobile1stHidden] = useState<boolean>(false);

  const handleIconStorage = () => {
    setIsMainHidden((prev) => !prev);
  };

  const handleListTrigger = () => {
    setIsMobile1stHidden((prev) => !prev);
  };

  return (
    <>
      <div
        className={`${styles["main-box"]} ${isMainHidden && styles.hidden}
        ${optionData.iconShadow && styles.shadow}`}
        onMouseEnter={() => setIsHovered({ cardHover: true, iconHover: true })}
        onMouseLeave={() => setIsHovered({ cardHover: false, iconHover: false })}
      >
        <ScreenControl />
        <MirrorEffectControl />
        <Unknown />
        <VoiceControl />
        <ToFirst mobileHidden={true} />
        <ToPrev mobileHidden={true} />
        <ShowListImage />
        <FullScreen />
        <RandomControl />
        <ToNext mobileHidden={true} />
        <ToLast mobileHidden={true} />
        <AutoNext />
        <RotateYControl />
        <FilterControl />
        <ImageEffectControl />
      </div>

      <div
        className={`${styles["mobile-box-1st"]} 
        ${optionData.iconShadow && styles.shadow}
        ${isMobile1stHidden && styles.hidden}`}
        onMouseEnter={() => setIsHovered({ cardHover: true, iconHover: true })}
        onMouseLeave={() => setIsHovered({ cardHover: false, iconHover: false })}
      >
        <ToFirst mobileHidden={false} />
        <ToPrev mobileHidden={false} />
        <MobileIconListTrigger boxKey="1st" handleListTrigger={handleListTrigger} />
        <ToNext mobileHidden={false} />
        <ToLast mobileHidden={false} />
      </div>

      <div
        className={`${styles["mobile-box-2nd"]}
        ${optionData.iconShadow && styles.shadow}
        ${!isMobile1stHidden && styles.hidden}`}
        onMouseEnter={() => setIsHovered({ cardHover: true, iconHover: true })}
        onMouseLeave={() => setIsHovered({ cardHover: false, iconHover: false })}
      >
        <MobilePositionControl />
        <MobileIconListTrigger boxKey="2nd" handleListTrigger={handleListTrigger} />
        <MobileScaleControl />
      </div>

      <div
        className={`${styles["storage-box"]} ${optionData.iconShadow && styles.shadow}`}
        onMouseEnter={() => setIsHovered({ cardHover: true, iconHover: true })}
        onMouseLeave={() => setIsHovered({ cardHover: false, iconHover: false })}
      >
        <IconStorage handleIconStorage={handleIconStorage} />
      </div>
    </>
  );
};

export default Control;
