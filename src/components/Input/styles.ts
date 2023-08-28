import { TextInput } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

interface TextInputProps {
  error?: boolean;
}

export const StyledInput = styled(TextInput)<TextInputProps>`
  width: 100%;
  height: 44px;
  margin: 4px 0;
  padding: 10px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.neutral["400"]};
  background-color: #fff;
  color: ${({ theme }) => theme.colors.neutral["900"]};

  ${({ error, theme }) =>
    error &&
    `
      border-color: ${theme.colors.red["400"]};
      color: ${theme.colors.red["500"]};
    `}
`;

export const IconContainer = styled.View`
  position: absolute;
  right: 16px;
  top: 32px;
`;
