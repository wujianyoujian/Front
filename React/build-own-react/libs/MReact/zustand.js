import { useState, useEffect } from "./hooks";

export function createStore(createState) {
  let state;
  const listeners = new Set();

  const getState = () => state;
  const setState = (partial) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const pre = state;
      state = Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(pre, state));
    }
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = createState(setState, getState);

  return (selector = (s) => s) => {
    const [, forceUpdate] = useState(0);

    useEffect(() => {
      const unsubscribe = subscribe((pre, next) => {
        if (Object.is(pre, next)) return;
        forceUpdate((n) => n + 1);
      });
      return unsubscribe;
    }, []);

    return selector(getState());
  };
}


export function createStore(createState) {
  let state;

  const listener = new Set();

  const getState = () => state;
  const setState = (partial) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const pre = state;
      state = Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(pre, state))
    }
  }

  const subscribe = (listener) => {
    listener.add(listener);
    return () => listeners.delete(listener)
  }

  state = createState(setState, getState)

  return selector => {
    const [, forceUpdate] = useState(0);

    useEffect(() => {
      const unsubscribe = subscribe((pre, next) => {
        if (Object.is(pre, next)) return;
        forceUpdate((n) => n + 1);
      })
      return unsubscribe
    }, [])
    
    return selector(getState())
  }
}