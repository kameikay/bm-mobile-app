import { useEffect } from "react";
import { Modal, TouchableOpacity } from "react-native";

import { XMarkIcon } from "@assets/icons/XMarkIcon";
import { theme } from "@styles/theme/default";
import { ModalContainer, ModalHeader } from "./styles";
import WarehouseForm from "./WarehouseForm";
import { useWarehouse } from "src/store/useWarehouse";
import { ChevronLeftIcon } from "@assets/icons/ChevronLeftIcon";
import ShelfForm from "./ShelfForm";
import Toast from "react-native-toast-message";

interface IWarehouseModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function WarehouseModal({
  isModalOpen,
  setIsModalOpen,
}: IWarehouseModalProps) {
  const {
    isShelfModalOpen,
    setIsShelfModalOpen,
    setShelfId,
    setWarehouseId,
    setShelfNumber,
  } = useWarehouse();

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsShelfModalOpen(false);
    setWarehouseId(null);
    setShelfId(null);
    setShelfNumber(null);
  }

  useEffect(() => {
    return () => {
      setIsShelfModalOpen(false);
      setWarehouseId(null);
      setShelfId(null);
      setShelfNumber(null);
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
        <ModalHeader isShelfModalOpen={isShelfModalOpen}>
          {isShelfModalOpen && (
            <TouchableOpacity onPress={() => setIsShelfModalOpen(false)}>
              <ChevronLeftIcon />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => handleCloseModal()}>
            <XMarkIcon color={theme.colors.gray[400]} />
          </TouchableOpacity>
        </ModalHeader>

        {isShelfModalOpen ? <ShelfForm /> : <WarehouseForm />}
      </ModalContainer>
      <Toast />
    </Modal>
  );
}
