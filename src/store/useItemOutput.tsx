import { create } from "zustand";

type State = {
  itemOutputId?: string | null;
  isItemOutputModalOpen: boolean;
};

type Actions = {
  setItemOutputId: (id: string | null) => void;
  setIsItemOutputModalOpen: (isOpen: boolean) => void;
  handleCloseItemOutputModal: () => void;
};

export const useItemOutput = create<State & Actions>((set) => ({
  itemOutputId: null,
  setItemOutputId: (itemOutputId) => set({ itemOutputId }),
  isItemOutputModalOpen: false,
  setIsItemOutputModalOpen: (isItemOutputModalOpen) =>
    set({ isItemOutputModalOpen }),
  handleCloseItemOutputModal: () =>
    set({
      itemOutputId: null,
      isItemOutputModalOpen: false,
    }),
}));
