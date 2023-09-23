import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export const ControlContainer = styled.KeyboardAvoidingView`
  width: 100%;
  padding: 16px;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 8px;
`;

export const FormContainer = styled.View`
  gap: 16px;
  width: 100%;
  margin-top: 48px;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  margin-top: 24px;
  gap: 16px;
  flex-direction: row;
`;

export const SearchContainer = styled.View`
  width: 100%;
  margin: 16px 0;
`;
