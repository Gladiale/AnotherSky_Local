import styles from "./VoiceControl.module.css";
import { useState } from "react";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { GiHeartStake } from "react-icons/gi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import IconSmall from "../Common/IconSmall";
import IconDefault from "../Common/IconDefault";

const VoiceControl = () => {
  const { mediaState, mediaDispatch } = useMediaInfo();

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
              onClick={() => mediaDispatch({ type: "voiceFirst" })}
            />
            <IconSmall
              children={<BsChevronLeft />}
              onClick={() => mediaDispatch({ type: "voicePrev" })}
            />
            <p onClick={() => mediaDispatch({ type: "voiceFolderNext" })}>
              {mediaState.folder.voice[1]}
            </p>
            <IconSmall
              children={<BsChevronRight />}
              onClick={() => mediaDispatch({ type: "voiceNext" })}
            />
            <IconSmall
              children={<BiLastPage />}
              onClick={() => mediaDispatch({ type: "voiceLast" })}
            />
          </div>
          <audio
            controls
            autoPlay
            loop={isLoop}
            onEnded={isLoop ? undefined : () => mediaDispatch({ type: "voiceNext" })}
            className={isLoop ? "" : styles.inOrder}
            src={`/voice/${mediaState.folder.voice[1]}/${mediaState.file.voiceFile[1]}`}
          ></audio>
        </div>
      )}

      <IconDefault
        className={hasVoice && "toggleVoice"}
        onClick={() => setHasVoice((prev) => !prev)}
        onContextMenu={changeVoiceLoop}
      >
        <GiHeartStake />
      </IconDefault>
    </div>
  );
};

export default VoiceControl;
