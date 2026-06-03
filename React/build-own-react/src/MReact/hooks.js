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
  scheduleRerender
} from "./reconciler.js"



function useState(initial) {
  const oldHook = getCurrentHook()

  const hook = {
    state: oldHook ? oldHook.state : typeof initial == 'function' ? initial() : initial,
    queue: [],
    next: null,
  }

  const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    if (typeof action === 'function') {
      hook.state = action(hook.state)
    } else {
      hook.state = action
    }
  })

  const setState = action => {
    const newState = typeof action === 'function' ? action(hook.state) : action
    if (Object.is(newState, hook.state)) return

    hook.queue.push(action)
    scheduleRerender()
  }

  mountHook(hook)
  return [hook.state, setState]
}

function useEffect(fn, deps) {
  const oldHook = getCurrentHook();

  const hasNoDeps = !deps;
  const hasChangedDeps = oldHook ? !deps.every((dep, i) => dep === oldHook.deps[i]) : true
  const hook = {
    deps,
    cleanup: oldHook ? oldHook.cleanup : undefined,
    fn,
    tag: hasNoDeps || hasChangedDeps ? 'EFFECT': null,
    next: null
  }
  mountHook(hook)
}

function useLayoutEffect(fn, deps) {
  const oldHook = getCurrentHook();

  const hasNoDeps = !deps;
  const hasChangedDeps = oldHook ? !deps.every((dep, i) => dep === oldHook.deps[i]) : true
  const hook = {
    deps,
    cleanup: oldHook ? oldHook.cleanup : undefined,
    fn,
    tag: hasNoDeps || hasChangedDeps ? 'LAYOUTEFFECT': null,
    next: null
  }
  mountHook(hook)
}

function useRef(initial) {
  const oldHook = getCurrentHook();

  const hook = {
    ref: oldHook ? oldHook.ref : { current: initial },
    next: null
  }

  mountHook(hook)
  return hook.ref
}

function useMemo(fn, deps) {
  const oldHook = getCurrentHook();
  const hasNoDeps = !deps;
  const hasChangedDeps = oldHook ? !deps.every((dep, i) => dep === oldHook.deps[i]) : true

  const hook = {
    deps,
    value: hasNoDeps || hasChangedDeps ? fn() : oldHook.value,
    next: null
  }
  mountHook(hook)
  return hook.value
}

function useCallBack(fn, deps) {
  const oldHook = getCurrentHook();
  const hasNoDeps = !deps;
  const hasChangedDeps = oldHook ? !deps.every((dep, i) => dep === oldHook.deps[i]) : true

  const hook = {
    deps,
    value: hasNoDeps || hasChangedDeps ? fn : oldHook.value,
    next: null
  }
  mountHook(hook)
  return hook.value
}

function mountHook(hook) {
  const wipFiber = getWipFiber();
  const workInProgressHook = getWorkInProgressHook();
  const oldHook = getCurrentHook();

  if (!wipFiber.memoizedState) {
    wipFiber.memoizedState = hook
  } else {
    workInProgressHook.next = hook
  }
  setWorkInProgressHook(hook)
  setCurrentHook(oldHook?.next ?? null);
}

export { useState, useEffect, useLayoutEffect, useRef, useCallBack, useMemo }
