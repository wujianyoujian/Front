import { useSyncExternalStore } from "react";

type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
type GetState<T> = () => T;

export function create<T>(createState: (set: SetState<T>, get: GetState<T>) => T) {
  let state: T;
  const listeners = new Set<() => void>();

  const getState: GetState<T> = () => state;
  const setState: SetState<T> = (partial) => {
    const nextState =
      typeof partial === "function" ? (partial as (state: T) => Partial<T>)(state) : partial;
    state = Object.assign({}, state, nextState);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  state = createState(setState, getState);

  return <R = T>(selector: (state: T) => R = ((s: T) => s) as unknown as (state: T) => R): R => {
    return useSyncExternalStore(subscribe, () => selector(getState()));
  };
}


