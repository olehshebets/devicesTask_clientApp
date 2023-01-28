import React from "react";
import Select, {
  GroupBase,
  Props,
  SingleValueProps,
  StylesConfig,
  Theme,
} from "react-select";
import cn from "classnames";

import DropdownIndicator from "./dropdown-indicator";
import SingleValue from "./single-value";

import styles from "./styles.module.scss";

type SelectType = "default" | "input";

export interface OptionType {
  label: string;
  value: string;
}

const configStyles = (selectType?: SelectType): StylesConfig => ({
  container: (base) => ({
    ...base,
    height: "100%",
    minWidth: "155px",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "16px",
    color: "var(--black-100)",
    maxHeight: "38px",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    overflow: "visible",
  }),
  option: (base) => ({
    ...base,
    cursor: "pointer",
  }),
  control: (base, state) => ({
    ...base,
    cursor: "pointer",
    padding: "11px 12px",
    display: "flex",
    gap: "16px",
    maxHeight: "38px",
    border: "1px solid var(--input-border-color)",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0",
    fontSize: "14px",
    color: "var(--black-65)",
    display: "flex",
    alignItems: "center",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: "fit-content",
  }),
  placeholder: (base) => ({
    ...base,
    marginLeft: "0",
    marginRight: "0",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "16px",
    color: "var(--black-65)",
  }),
});

const configTheme = (theme: Theme): Theme => ({
  ...theme,
  borderRadius: 4,
  colors: {
    ...theme.colors,
    primary: "var(--primary-color)",
  },
});

declare module "react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    title?: string;
    type?: SelectType;
    withDefaultValue?: boolean;
    label?: string;
    error?: string;
  }
}

const CustomSelect: React.FC<Props<OptionType, false>> = ({
  label,
  type,
  title,
  defaultValue,
  required,
  inputId,
  error,
  options,
  ...props
}) => {
  const select = (
    <Select
      {...props}
      theme={configTheme}
      menuPlacement={props.menuPlacement || "auto"}
      menuPosition="absolute"
      defaultValue={defaultValue}
      styles={configStyles(type)}
      components={{
        DropdownIndicator,
        SingleValue: (
          singleValueProps: SingleValueProps<OptionType, false>
        ) => <SingleValue title={title} {...singleValueProps} />,
      }}
      inputId={inputId}
      required={required}
      options={options}
    />
  );

  return label ? (
    <div
      className={cn(styles.wrapper, {
        [styles.withError]: error,
      })}
    >
      <label htmlFor={inputId}>
        {label} {required && <sup>*</sup>}
      </label>
      {select}
    </div>
  ) : (
    select
  );
};

export default CustomSelect;
