import styles from "./VoiceControl.module.css";
import { useState } from "react";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { GiHeartStake } from "react-icons/gi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

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
            <BiFirstPage
              className={styles.iconSmall}
              onClick={() => mediaDispatch({ type: "voiceFirst" })}
            />
            <BsChevronLeft
              className={styles.iconSmall}
              onClick={() => mediaDispatch({ type: "voicePrev" })}
            />
            <p onClick={() => mediaDispatch({ type: "voiceFolderNext" })}>
              {mediaState.folder.voiceFolder[1]}
            </p>
            <BsChevronRight
              className={styles.iconSmall}
              onClick={() => mediaDispatch({ type: "voiceNext" })}
            />
            <BiLastPage
              className={styles.iconSmall}
              onClick={() => mediaDispatch({ type: "voiceLast" })}
            />
          </div>
          <audio
            controls
            autoPlay
            loop={isLoop}
            onEnded={
              isLoop ? undefined : () => mediaDispatch({ type: "voiceNext" })
            }
            className={isLoop ? "" : styles.inOrder}
            src={`/voice/${mediaState.folder.voiceFolder[1]}/${mediaState.file.voiceFile[1]}`}
          ></audio>
        </div>
      )}

      <GiHeartStake
        className={`${styles.icon} ${hasVoice ? styles.toggleVoice : ""}`}
        onClick={() => setHasVoice((prev) => !prev)}
        onContextMenu={changeVoiceLoop}
      />
    </div>
  );
};

export default VoiceControl;
