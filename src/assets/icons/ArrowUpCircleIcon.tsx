import { theme } from "@styles/theme/default";
import { SvgXml } from "react-native-svg";

interface ArrowUpCircleProps {
  color?: string;
  width?: number;
  height?: number;
}

export function ArrowUpCircle({ color, width, height }: ArrowUpCircleProps) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${color || theme.colors.green[400]}" width="${width || 24}" height="${height || 24}"><path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
  return <SvgXml xml={markup} />;
}
