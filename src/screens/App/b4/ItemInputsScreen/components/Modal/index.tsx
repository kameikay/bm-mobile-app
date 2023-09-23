import { useEffect } from "react";
import { Modal, TouchableOpacity } from "react-native";

import { XMarkIcon } from "@assets/icons/XMarkIcon";
import { theme } from "@styles/theme/default";
import { ModalContainer } from "./styles";
import ItemInputsForm from "./ItemInputsForm";
import { useItemInput } from "@store/useItemInput";

interface IItemInputsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function ItemInputsModal({
  isModalOpen,
  setIsModalOpen,
}: IItemInputsModalProps) {
  const { setItemInputId } = useItemInput();

  function handleCloseModal() {
    setIsModalOpen(false);
    setItemInputId(null);
  }

  useEffect(() => {
    return () => {
      handleCloseModal();
    };
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={isModalOpen}
      onRequestClose={() => handleCloseModal()}
      presentationStyle="fullScreen"
    >
      <ModalContainer>
        <TouchableOpacity
          onPress={() => handleCloseModal()}
          style={{ alignSelf: "flex-end", marginBottom: 24 }}
        >
          <XMarkIcon color={theme.colors.gray[400]} />
        </TouchableOpacity>

        <ItemInputsForm />
      </ModalContainer>
    </Modal>
  );
}
