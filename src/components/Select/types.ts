import { Option } from "@customTypes/Option";

export interface SelectProps {
  label: string;
  isLabelBold?: boolean;
  options: Option[];
  onChangeSelect: (value: string) => void;
  error?: string;
  disabled?: boolean;
}
