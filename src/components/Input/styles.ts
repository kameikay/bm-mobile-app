import { TextInput } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

interface TextInputProps {
  error?: boolean;
  isFocused?: boolean;
  disabled?: boolean;
}

export const StyledInput = styled(TextInput)<TextInputProps>`
  width: 100%;
  height: 44px;
  margin: 4px 0;
  padding: 10px 16px;
  border-radius: 4px;
  border: 1px solid
    ${({ error, theme, isFocused }) =>
    error
      ? theme.colors.red[400]
      : isFocused
        ? theme.colors.primary[400]
        : theme.colors.neutral[300]};
  background-color: #fff;
  color: ${({ error, theme }) =>
    error ? theme.colors.red[500] : theme.colors.neutral[900]};
  box-shadow: 0px 1px 1px #d4d4d4;
  elevation: 1;

  ${({ disabled, theme }) =>
    disabled &&
    `
    background-color: ${theme.colors.neutral[100]};
  `}
`;

export const IconContainer = styled.View`
  position: absolute;
  right: 16px;
  top: 32px;
`;
