import { theme } from "@styles/theme/default";
import { SvgXml } from "react-native-svg";

interface XMarkIconProps {
  color?: string;
  width?: number;
  height?: number;
}

export function XMarkIcon({ color, width, height }: XMarkIconProps) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${color || theme.colors.neutral[100]}" width="${width || 24}" height="${height || 24}"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;

  return <SvgXml xml={markup} />;
}
