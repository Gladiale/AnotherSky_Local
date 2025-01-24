import styles from "./IconSmall.module.css";

type IconSmallProps = {
  shape: "circle" | "rabbet" | "rhombus";
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const IconSmall = ({ shape, children, onClick, onContextMenu }: IconSmallProps) => {
  return (
    <div
      className={`${styles.iconSmall} ${styles[shape]}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
};

export default IconSmall;
