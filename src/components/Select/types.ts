import { Option } from "@customTypes/Option";

export interface SelectProps {
  label: string;
  options: Option[];
  onChangeSelect: (value: string) => void;
  error?: string;
}
