import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface IContainerProps {
  color?: string;
  type: "contained" | "outlined";
}

export const Container = styled(TouchableOpacity)<IContainerProps>`
  width: 100%;
  height: 40px;
  background-color: ${({ type, color }) =>
    type === "contained" ? color : "transparent"};
  padding: 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  border: ${({ type, color }) => {
    if (type === "contained") return "none";

    return `2px solid ${color}`;
  }};

  ${({ disabled, theme, type }) =>
    disabled &&
    `
    background-color: ${
  type === "contained" ? theme.colors.gray[400] : "transparent"
};
  `}
`;
