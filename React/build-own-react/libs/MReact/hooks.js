import {
  getWipFiber,
  getCurrentRoot,
  getWipRoot,
  setWipRoot,
  setNextUnitOfWork,
  setDeletions,
  getCurrentHook,
  setCurrentHook,
  getWorkInProgressHook,
  setWorkInProgressHook,
  scheduleRerender,
} from "./reconciler.js";

function useReducer(reducer, initialArg, initial) {
  const oldHook = getCurrentHook();

  if (oldHook) {
    const hook = {
      state: oldHook.state,
      queue: oldHook.queue,
      next: null,
    };

    const queue = hook.queue;
    if (queue.pending.length > 0) {
      queue.pending.forEach((action) => {
        hook.state = reducer(hook.state, action);
      });
      queue.lastRenderedState = hook.state;
      queue.pending = [];
    }
    mountHook(hook);
    return [hook.state, queue.dispatch];
  }

  const initialState = oldHook
    ? oldHook.state
    : typeof initial == "function"
      ? initial(initialArg)
      : initialArg;

  const hook = {
    state: initialState,
    queue: null,
    next: null,
  };

  const queue = {
    pending: [],
    lastRenderedState: initialState,
    dispatch: null,
  };

  const dispatch = (action) => {
    const newState = reducer(queue.lastRenderedState, action);
    if (Object.is(newState, queue.lastRenderedState)) return;

    queue.pending.push(action);
    queue.lastRenderedState = newState;
    scheduleRerender();
  };

  queue.dispatch = dispatch;
  hook.queue = queue;
  mountHook(hook);

  return [hook.state, dispatch];
}

function useState(initial) {
  return useReducer(
    // state 表示上一个的hook的state，action表示当前 要执行的 函数 如 setCount((pre) => cur)，或者setCount(cur)
    (state, action) => (typeof action === "function" ? action(state) : action),
    initial,
    (v) => (typeof v === "function" ? v() : v),
  );
}

function useEffect(fn, deps) {
  const oldHook = getCurrentHook();

  const hasNoDeps = !deps;
  const hasChangedDeps = oldHook
    ? !deps.every((dep, i) => dep === oldHook.deps[i])
    : true;
  const hook = {
    deps,
    cleanup: oldHook ? oldHook.cleanup : undefined,
    fn,
    tag: hasNoDeps || hasChangedDeps ? "EFFECT" : null,
    next: null,
  };
  mountHook(hook);
}

function useLayoutEffect(fn, deps) {
  const oldHook = getCurrentHook();

  const hasNoDeps = !deps;
  const hasChangedDeps = oldHook
    ? !deps.every((dep, i) => dep === oldHook.deps[i])
    : true;
  const hook = {
    deps,
    cleanup: oldHook ? oldHook.cleanup : undefined,
    fn,
    tag: hasNoDeps || hasChangedDeps ? "LAYOUTEFFECT" : null,
    next: null,
  };
  mountHook(hook);
}

function useRef(initial) {
  const oldHook = getCurrentHook();

  const hook = {
    ref: oldHook ? oldHook.ref : { current: initial },
    next: null,
  };

  mountHook(hook);
  return hook.ref;
}

function useMemo(fn, deps) {
  const oldHook = getCurrentHook();
  const hasNoDeps = !deps;
  const hasChangedDeps = oldHook
    ? !deps.every((dep, i) => dep === oldHook.deps[i])
    : true;

  const hook = {
    deps,
    value: hasNoDeps || hasChangedDeps ? fn() : oldHook.value,
    next: null,
  };
  mountHook(hook);
  return hook.value;
}

function useCallBack(fn, deps) {
  const oldHook = getCurrentHook();
  const hasNoDeps = !deps;
  const hasChangedDeps = oldHook
    ? !deps.every((dep, i) => dep === oldHook.deps[i])
    : true;

  const hook = {
    deps,
    value: hasNoDeps || hasChangedDeps ? fn : oldHook.value,
    next: null,
  };
  mountHook(hook);
  return hook.value;
}

function mountHook(hook) {
  const wipFiber = getWipFiber();
  const workInProgressHook = getWorkInProgressHook();
  const oldHook = getCurrentHook();

  if (!wipFiber.memoizedState) {
    wipFiber.memoizedState = hook;
  } else {
    workInProgressHook.next = hook;
  }
  setWorkInProgressHook(hook);
  setCurrentHook(oldHook?.next ?? null);
}

export {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallBack,
  useMemo,
  useReducer,
};
