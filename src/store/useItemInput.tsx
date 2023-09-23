import { create } from "zustand";

type State = {
  itemInputId?: string | null;
  isItemInputModalOpen: boolean;
};

type Actions = {
  setItemInputId: (id: string | null) => void;
  setIsItemInputModalOpen: (isOpen: boolean) => void;
  handleCloseItemInputModal: () => void;
};

export const useItemInput = create<State & Actions>((set) => ({
  itemInputId: null,
  setItemInputId: (itemInputId) => set({ itemInputId }),
  isItemInputModalOpen: false,
  setIsItemInputModalOpen: (isItemInputModalOpen) =>
    set({ isItemInputModalOpen }),
  handleCloseItemInputModal: () =>
    set({
      itemInputId: null,
      isItemInputModalOpen: false,
    }),
}));
