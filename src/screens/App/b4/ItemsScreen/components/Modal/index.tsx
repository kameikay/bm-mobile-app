import { useEffect } from "react";
import { Modal, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

import { XMarkIcon } from "@assets/icons/XMarkIcon";
import { theme } from "@styles/theme/default";
import { useItem } from "@store/useItem";
import { ModalContainer } from "./styles";
import ItemForm from "./ItemForm";

interface IItemModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function ItemModal({
  isModalOpen,
  setIsModalOpen,
}: IItemModalProps) {
  const { setItemId } = useItem();

  function handleCloseModal() {
    setIsModalOpen(false);
    setItemId(null);
  }

  useEffect(() => {
    return () => {
      setIsModalOpen(false);
      setItemId(null);
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

        <ItemForm />
      </ModalContainer>
      <Toast />
    </Modal>
  );
}
