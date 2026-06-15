import { create } from "../../libs/zustand1";

const useStore = create((set, get) => ({
  theme: "light",
  setTheme: (theme) => set({ theme: theme }),
}));

export default useStore;
