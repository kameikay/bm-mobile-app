import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 0;
`;

export const TextListContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 8px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
