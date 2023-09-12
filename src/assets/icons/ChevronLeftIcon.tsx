import { theme } from "@styles/theme/default";
import { SvgXml } from "react-native-svg";

interface ChevronLeftIconProps {
  color?: string;
  width?: number;
  height?: number;
}

export function ChevronLeftIcon({
  color,
  width,
  height,
}: ChevronLeftIconProps) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${color || theme.colors.primary[900]}" width="${width || 24}" height="${height || 24}"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>`;
  return <SvgXml xml={markup} />;
}
