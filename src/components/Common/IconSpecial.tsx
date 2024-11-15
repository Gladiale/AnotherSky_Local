import styles from "./IconSpecial.module.css";

type IconSpecialProps = {
  children: React.ReactNode;
  effect?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const IconSpecial = ({ children, effect, onClick, onContextMenu }: IconSpecialProps) => {
  return (
    <div
      className={`${styles.iconSpecial} ${effect ? styles.effect : ""}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
};

export default IconSpecial;
