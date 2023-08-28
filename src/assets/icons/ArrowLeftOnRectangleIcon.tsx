import { theme } from "@styles/theme/default";
import { SvgXml } from "react-native-svg";

interface ArrowLeftOnRectangleIconProps {
  color?: string;
  width?: number;
  height?: number;
}

export function ArrowLeftOnRectangleIcon({ color, width, height }: ArrowLeftOnRectangleIconProps) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${color || theme.colors.red[400]}" width="${width || 24}" height="${height || 24}"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
  `;

  return <SvgXml xml={markup} />;
}
