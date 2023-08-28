import styled from "styled-components/native";

interface TextProps {
  weight?: "300" | "400" | "500" | "600" | "700";
  color?: string;
  size?: number;
  opacity?: number;
}

export const Text = styled.Text<TextProps>`
  font-family: ${({ weight }) => (weight ? `Inter-${weight}` : "Inter-400")};
  color: ${({ theme, color }) => (color ? color : theme.colors.gray[900])};
  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  opacity: ${({ opacity }) => (opacity ? opacity : 1)};
`;
