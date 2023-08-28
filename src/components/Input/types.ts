import { ElementType } from "react";
import { TextInputProps } from "react-native";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends TextInputProps {
  label: string;
  icon?: ElementType | null;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  iconButtonFunction?: () => void;
}
