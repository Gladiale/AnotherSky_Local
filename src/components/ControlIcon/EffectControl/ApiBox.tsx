import styles from "./ApiBox.module.css";
import { useFilterApi } from "../../../hooks/useFilterApi";
import PartsBox from "../../Common/PartsBox";

const ApiBox = () => {
  const { message, applyFilterStatus, handlePost, handleUpdate, handleDelete } =
    useFilterApi();

  return (
    <div className={styles["api-box"]}>
      {/* boxに更新 */}
      <PartsBox
        message={message}
        onPrevClick={() => applyFilterStatus("prev")}
        onNextClick={() => applyFilterStatus("next")}
        onBoxClick={() => applyFilterStatus("reset")}
      />
      <div className={styles["btn-box"]}>
        <button type="button" onClick={handlePost}>
          追加
        </button>
        <button type="button" onClick={handleUpdate}>
          更新
        </button>
        <button type="button" onClick={handleDelete}>
          削除
        </button>
      </div>
    </div>
  );
};

export default ApiBox;
