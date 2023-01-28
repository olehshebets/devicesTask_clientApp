import { components, GroupBase, SingleValueProps } from "react-select";

import { OptionType } from ".";

interface CustomSingleValueProps extends SingleValueProps<OptionType, false> {
  title?: string;
}

const SingleValue = ({ children, title, ...props }: CustomSingleValueProps) => {
  const text =
    props.data.value === (props.options[0] as OptionType).value && title
      ? `${title}: ${props.data.label}`
      : props.data.label;

  return <components.SingleValue {...props}>{text}</components.SingleValue>;
};
export default SingleValue;
