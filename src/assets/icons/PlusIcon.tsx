import { theme } from "@styles/theme/default";
import { SvgXml } from "react-native-svg";

interface PlusIconProps {
  color?: string;
  width?: number;
  height?: number;
}

export function PlusIcon({ color, width, height }: PlusIconProps) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${color || theme.colors.neutral[100]}" width="${width || 24}" height="${height || 24}"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`;

  return <SvgXml xml={markup} />;
}
