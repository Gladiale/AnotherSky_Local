import styles from "./Icon.module.css";

type IconDefaultProps = {
  children: React.ReactNode;
  className?: string | false;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const IconDefault = ({
  children,
  className,
  onClick,
  onContextMenu,
}: IconDefaultProps) => {
  return (
    <div
      className={`${styles.iconDefault} ${className && styles[className]}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
};

export default IconDefault;
