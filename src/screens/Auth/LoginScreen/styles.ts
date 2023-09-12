import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoginContainer = styled.KeyboardAvoidingView`
  max-width: 320px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.View`
  margin-top: 16px;
  max-width: 188px;
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
`;
