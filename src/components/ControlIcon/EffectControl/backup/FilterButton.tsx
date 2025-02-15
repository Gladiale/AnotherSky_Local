import styles from "./FilterButton.module.css";
import { useFilterStatus } from "../../../../hooks/useFilterStatus";

const FilterButton = () => {
  const { message, copyFilterStatus, applyFilterStatus, resetFilterStatus } =
    useFilterStatus();

  return (
    <div className={styles.filterButton} data-message="右クリックリセット">
      <input
        type="button"
        value={message.apply}
        onClick={applyFilterStatus}
        onContextMenu={resetFilterStatus}
      />
      <input type="button" value={message.copy} onClick={copyFilterStatus} />
    </div>
  );
};

export default FilterButton;
