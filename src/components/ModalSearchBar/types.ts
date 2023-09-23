import { Option } from "@customTypes/Option";

export interface InputSearchProps {
  label: string;
  options: Option[];
  onChangeSelect: (value: string) => void;
  error?: string;
  disabled?: boolean;
  value?: string;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}
