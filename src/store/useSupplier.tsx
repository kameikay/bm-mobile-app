import { Supplier } from "@services/SupplierService/types";
import { create } from "zustand";

type State = {
  supplierId?: string | null;
  suppliers: Supplier[];
};

type Actions = {
  setSupplierId: (id: string | null) => void;
  setSuppliers: (suppliers: Supplier[]) => void;
};

export const useSupplier = create<State & Actions>((set) => ({
  supplierId: null,
  setSupplierId: (supplierId) => set({ supplierId }),
  suppliers: [],
  setSuppliers: (suppliers) => set({ suppliers }),
}));
