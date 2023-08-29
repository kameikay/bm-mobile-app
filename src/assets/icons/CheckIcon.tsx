import { theme } from "@styles/theme/default";
import { SvgXml } from "react-native-svg";

interface CheckIconProps {
  color?: string;
  width?: number;
  height?: number;
}

export function CheckIcon({ color, width, height }: CheckIconProps) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${color || theme.colors.green[400]}" width="${width || 24}" height="${height || 24}"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`;

  return <SvgXml xml={markup} />;
}
