import { createStore } from "../libs/MReact";

const useStore = createStore((set, get) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}));

export { useStore };
