import { ElementType } from "react";
import { TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  label: string;
  labelWeight?: "bold" | "regular";
  icon?: ElementType | null;
  error?: string;
  iconButtonFunction?: () => void;
  disabled?: boolean;
}
