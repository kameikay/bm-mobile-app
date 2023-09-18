import styled from "styled-components/native";

export const ModalContainer = styled.SafeAreaView`
  margin: 16px;
  flex: 1;
`;

interface IModalHeader {
  isShelfModalOpen: boolean;
}

export const ModalHeader = styled.View<IModalHeader>`
  width: 100%;
  flex-direction: row;
  justify-content: ${({ isShelfModalOpen }) =>
    isShelfModalOpen ? "space-between" : "flex-end"};
  align-items: center;
  margin-bottom: 24px;
`;

export const WarehouseDataContainer = styled.View`
  margin-top: 16px;
  gap: 16px;
`;

export const ShelvesContainer = styled.View`
  margin-top: 24px;
  flex: 1;
  gap: 16px;
`;

export const ShelfCreateButtons = styled.View`
  margin: 16px 0 32px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const CreateButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary[50]};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const FieldsOuterContainer = styled.ScrollView`
  margin-top: 16px;
`;

export const FieldsContainer = styled.View`
  gap: 8px;
`;

export const WarehouseButtonContainer = styled.View`
  margin-top: 24px;
`;
