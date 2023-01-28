import cn from "classnames";

import styles from "./styles.module.scss";

interface Props {
  active: boolean;
  align?: "left" | "right";
  children?: JSX.Element;
  className?: string;
  content: JSX.Element;
}

const Dropdown = ({ children, content, align, active, className }: Props) => {
  return (
    <div className={cn(styles.dropdownWrapper, className)}>
      {children}
      <div
        className={cn(
          styles.dropdownContent,
          { [styles.visible]: active },
          `${styles[align || "left"]}`
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default Dropdown;
