import styled from "styled-components/native";

interface ContainerProps {
  error?: boolean;
}

interface OptionItemProps {
  selected?: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const SelectContainer = styled.TouchableOpacity<ContainerProps>`
  width: 100%;
  height: 44px;
  margin: 4px 0;
  padding: 10px 16px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.neutral["300"]};
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.neutral[100] : "#fff"};
  color: ${({ theme }) => theme.colors.neutral["900"]};

  ${({ error, theme }) =>
    error &&
    `
      border-color: ${theme.colors.red["400"]};
      color: ${theme.colors.red["500"]};
    `}
`;

export const ModalContainer = styled.SafeAreaView``;

export const CloseModalContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-end;
  padding: 16px;
`;

export const OptionItem = styled.TouchableOpacity<OptionItemProps>`
  width: 100%;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.neutral["100"] : "#fff"};
`;
