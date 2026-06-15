import { useEffect, useState, useRef } from "react";

type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
type GetState<T> = () => T;

export function create<T>(createState: (set: SetState<T>, get: GetState<T>) => T) {
  let state: T;
  const listeners = new Set<(pre: T, next: Partial<T>) => void>();

  const setState: SetState<T> = (partial) => {
    const next = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(state, next)) {
      const pre = state;
      state = Object.assign({}, state, next);
      listeners.forEach((listener) => listener(pre, state));
    }
  };

  const getState: GetState<T> = () => state;

  state = createState(setState, getState);

  const subscribe = (listener: (pre: T, next: Partial<T>) => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return <R = T>(
    selector: (s: Partial<T>) => R = ((s: Partial<T>) => s) as unknown as (s: Partial<T>) => R
  ) => {
    const [, forceUpdate] = useState(0);

    useEffect(() => {
      const unSubscribe = subscribe((pre, next) => {
        if (Object.is(selector(pre), selector(next))) return;
        forceUpdate((n) => n + 1);
      });
      return unSubscribe;
    }, []);
    return selector(getState());
  };
}
