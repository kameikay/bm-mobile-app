import { Warehouses } from "@screens/App/b4/ControlScreen/components/types";
import { create } from "zustand";

type State = {
  warehouseId?: string | null;
  isShelfModalOpen: boolean;
  shelfNumber?: number | null;
  shelfId: string | null;
  warehouses: Warehouses[];
};

type Actions = {
  setWarehouseId: (warehouseId: string | null) => void;
  setIsShelfModalOpen: (isShelfModalOpen: boolean) => void;
  setShelfNumber: (shelfNumber: number | null) => void;
  setShelfId: (shelfId: string | null) => void;
  setWarehouses: (warehouses: Warehouses[]) => void;
};

export const useWarehouse = create<State & Actions>((set) => ({
  warehouseId: null,
  isShelfModalOpen: true,
  shelfNumber: null,
  shelfId: null,
  warehouses: [],
  setWarehouseId: (warehouseId) => set({ warehouseId }),
  setIsShelfModalOpen: (isShelfModalOpen) => set({ isShelfModalOpen }),
  setShelfNumber: (shelfNumber) => set({ shelfNumber }),
  setShelfId: (shelfId) => set({ shelfId }),
  setWarehouses: (warehouses) => set({ warehouses }),
}));
