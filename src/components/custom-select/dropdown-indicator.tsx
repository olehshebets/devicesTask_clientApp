import { components, DropdownIndicatorProps } from "react-select";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <i className={"icon-arrow-dropdown-down"} />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
