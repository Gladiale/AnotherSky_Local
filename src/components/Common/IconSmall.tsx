import styles from "./IconSmall.module.css";

type IconSmallProps = {
  theme?: "theme-2nd";
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const IconSmall = ({ theme, children, onClick, onContextMenu }: IconSmallProps) => {
  return (
    <div
      className={`${styles.iconSmall} ${theme && styles[theme]}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
};

export default IconSmall;
