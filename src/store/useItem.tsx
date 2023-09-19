import { Item } from "@services/ItemService/types";
import { create } from "zustand";

type State = {
  itemId?: string | null;
  items: Item[];
  isItemModalOpen: boolean;
};

type Actions = {
  setItemId: (id: string | null) => void;
  setItems: (items: Item[]) => void;
  setIsItemModalOpen: (isOpen: boolean) => void;
  handleCloseItemModal: () => void;
};

export const useItem = create<State & Actions>((set) => ({
  itemId: null,
  setItemId: (itemId) => set({ itemId }),
  items: [],
  setItems: (items) => set({ items }),
  isItemModalOpen: false,
  setIsItemModalOpen: (isItemModalOpen) => set({ isItemModalOpen }),
  handleCloseItemModal: () =>
    set({
      isItemModalOpen: false,
      itemId: null,
    }),
}));
