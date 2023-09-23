import { useEffect } from "react";
import { Modal, TouchableOpacity } from "react-native";

import { XMarkIcon } from "@assets/icons/XMarkIcon";
import { theme } from "@styles/theme/default";
import { ModalContainer } from "./styles";
import ItemOutputsForm from "./ItemOutputsForm";
import { useItemOutput } from "@store/useItemOutput";

interface IItemOutputsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function ItemOutputsModal({
  isModalOpen,
  setIsModalOpen,
}: IItemOutputsModalProps) {
  const { setItemOutputId } = useItemOutput();

  function handleCloseModal() {
    setIsModalOpen(false);
    setItemOutputId(null);
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

        <ItemOutputsForm />
      </ModalContainer>
    </Modal>
  );
}
