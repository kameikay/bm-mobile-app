import { Me } from "@services/UserService/types";
import { create } from "zustand";

type State = {
  selfData: Me | null;
};

type Actions = {
  setMe: (selfData: Me | null) => void;
};

export const useSelfDataStore = create<State & Actions>((set) => ({
  selfData: {} as Me,
  setMe: (selfData) => set({ selfData }),
}));
