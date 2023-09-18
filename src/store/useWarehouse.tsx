
import { Warehouse } from "@services/WarehouseService/types";
import { create } from "zustand";

type State = {
  isModalOpen: boolean;
  warehouseId?: string | null;
  isShelfModalOpen: boolean;
  shelfNumber?: number | null;
  shelfId: string | null;
  warehouses: Warehouse[];
};

type Actions = {
  setIsModalOpen: (isModalOpen: boolean) => void;
  setWarehouseId: (warehouseId: string | null) => void;
  setIsShelfModalOpen: (isShelfModalOpen: boolean) => void;
  setShelfNumber: (shelfNumber: number | null) => void;
  setShelfId: (shelfId: string | null) => void;
  setWarehouses: (warehouses: Warehouse[]) => void;
};

export const useWarehouse = create<State & Actions>((set) => ({
  isModalOpen: false,
  warehouseId: null,
  isShelfModalOpen: false,
  shelfNumber: null,
  shelfId: null,
  warehouses: [],
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setWarehouseId: (warehouseId) => set({ warehouseId }),
  setIsShelfModalOpen: (isShelfModalOpen) => set({ isShelfModalOpen }),
  setShelfNumber: (shelfNumber) => set({ shelfNumber }),
  setShelfId: (shelfId) => set({ shelfId }),
  setWarehouses: (warehouses) => set({ warehouses }),
}));
