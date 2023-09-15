import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

export const ExitContainer = styled.View`
  padding: 24px;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 24px;
`;
