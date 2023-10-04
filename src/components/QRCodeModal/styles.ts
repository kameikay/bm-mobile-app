import styled from "styled-components/native";

export const ModalContainer = styled.View`
  flex: 1;
`;

export const TouchableOpacityContainer = styled.TouchableOpacity`
  position: absolute;
  right: 24px;
  top: 48px;
  background-color: #ffffff;
  z-index: 999;
  border-radius: 100px;
  padding: 8px;
`;

export const BottomContainer = styled.View`
  position: absolute;
  bottom: 48px;
  width: 100%;
  padding: 24px;
`;
