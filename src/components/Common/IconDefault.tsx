import styles from "./IconDefault.module.css";

type IconDefaultProps = {
  children: React.ReactNode;
  active?: "onlyMobile" | "onlyDesk";
  anime?: "anime-color" | "anime-color-2nd" | "anime-color-3rd" | "anime-scale" | false;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const IconDefault = ({
  children,
  active,
  anime,
  onClick,
  onContextMenu,
}: IconDefaultProps) => {
  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={`${styles.iconDefault} 
      ${anime && styles[anime]} ${active && styles[active]}`}
    >
      {children}
    </div>
  );
};

export default IconDefault;
