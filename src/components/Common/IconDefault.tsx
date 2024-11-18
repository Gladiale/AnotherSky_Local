import styles from "./Icon.module.css";

type IconDefaultProps = {
  children: React.ReactNode;
  mobileHidden?: boolean;
  className?: "anime-color" | "anime-color-2nd" | "anime-scale" | false;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const IconDefault = ({
  children,
  mobileHidden,
  className,
  onClick,
  onContextMenu,
}: IconDefaultProps) => {
  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={`${styles.iconDefault} 
      ${className && styles[className]} 
      ${mobileHidden && styles.hidden}`}
    >
      {children}
    </div>
  );
};

export default IconDefault;
