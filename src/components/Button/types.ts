export interface ButtonProps {
  children: string;
  color?: string;
  type?: "contained" | "outlined";
  onPress: () => void;
  disabled?: boolean;
}
