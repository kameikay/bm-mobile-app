import { theme } from "@styles/theme/default";
import { SvgXml } from "react-native-svg";

interface ChevronDownIconProps {
  color?: string;
  width?: number;
  height?: number;
}

export function ChevronDownIcon({
  color,
  width,
  height,
}: ChevronDownIconProps) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${color || theme.colors.primary[900]}" width="${width || 24}" height="${height || 24}"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>`;

  return <SvgXml xml={markup} />;
}
