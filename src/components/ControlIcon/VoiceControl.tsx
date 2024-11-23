import styles from "./VoiceControl.module.css";
import { useState } from "react";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { GiHeartStake } from "react-icons/gi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import IconSmall from "../Common/IconSmall";
import IconDefault from "../Common/IconDefault";

const VoiceControl = () => {
  const { urlConfig } = useUrlConfig();
  const { mediaInfo, mediaInfoDispatch } = useMediaInfo();

  const [isLoop, setIsLoop] = useState<boolean>(true);
  const [hasVoice, setHasVoice] = useState<boolean>(false);

  // loop形式変更
  const changeVoiceLoop = (e: any) => {
    e.preventDefault();
    setIsLoop((prev) => !prev);
  };

  return (
    <div className={styles["voice-container"]}>
      {hasVoice && (
        <div className={styles["voice-box"]}>
          <div className={styles["voice-control"]}>
            <IconSmall
              children={<BiFirstPage />}
              onClick={() => mediaInfoDispatch({ type: "voiceFirst" })}
            />
            <IconSmall
              children={<BsChevronLeft />}
              onClick={() => mediaInfoDispatch({ type: "voicePrev" })}
            />
            <p onClick={() => mediaInfoDispatch({ type: "voiceFolderNext" })}>
              {mediaInfo.folder.voice[1]}
            </p>
            <IconSmall
              children={<BsChevronRight />}
              onClick={() => mediaInfoDispatch({ type: "voiceNext" })}
            />
            <IconSmall
              children={<BiLastPage />}
              onClick={() => mediaInfoDispatch({ type: "voiceLast" })}
            />
          </div>
          <audio
            controls
            autoPlay
            loop={isLoop}
            onEnded={isLoop ? undefined : () => mediaInfoDispatch({ type: "voiceNext" })}
            className={isLoop ? "" : styles.inOrder}
            src={urlConfig.voice}
          ></audio>
        </div>
      )}

      <IconDefault
        anime={hasVoice && "anime-scale"}
        onClick={() => setHasVoice((prev) => !prev)}
        onContextMenu={changeVoiceLoop}
      >
        <GiHeartStake />
      </IconDefault>
    </div>
  );
};

export default VoiceControl;
