import { HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "alert";
}

const Button: React.FC<Props> = ({
  children,
  className,
  variant,
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, variant && styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
