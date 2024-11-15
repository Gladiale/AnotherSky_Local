import styles from "./Icon.module.css";

type IconSmallProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const IconSmall = ({ children, onClick, onContextMenu }: IconSmallProps) => {
  return (
    <div className={styles.iconSmall} onClick={onClick} onContextMenu={onContextMenu}>
      {children}
    </div>
  );
};

export default IconSmall;
