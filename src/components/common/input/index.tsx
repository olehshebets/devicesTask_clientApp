import { InputHTMLAttributes } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
  icon?: JSX.Element;
  error?: string;
}

const Input: React.FC<Props> = ({
  label,
  id,
  required,
  wrapperClassName,
  icon,
  error,
  ...props
}) => {
  return (
    <div
      className={cn(
        styles.wrapper,
        { [styles.required]: required },
        { [styles.withError]: error },
        wrapperClassName
      )}
    >
      <div className={styles.iconWrapper}>{icon}</div>

      {label && (
        <label htmlFor={id}>
          {label} {required && <sup>*</sup>}
        </label>
      )}
      <input
        className={cn(styles.input, icon && styles.withIcon)}
        id={id}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;
