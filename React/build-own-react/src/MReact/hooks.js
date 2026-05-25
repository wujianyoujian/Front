import {
  getWipFiber,
  getHookIndex,
  setHookIndex,
  getCurrentRoot,
  setWipRoot,
  setNextUnitOfWork,
  setDeletions,
} from "./reconciler.js"

function useState(initial) {
  const wipFiber = getWipFiber()
  const hookIndex = getHookIndex()

  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex]

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  }

  const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    hook.state = action(hook.state)
  })

  const setState = action => {
    hook.queue.push(action)
    const currentRoot = getCurrentRoot()
    const newWipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    }
    setWipRoot(newWipRoot)
    setNextUnitOfWork(newWipRoot)
    setDeletions([])
  }

  wipFiber.hooks.push(hook)
  setHookIndex(hookIndex + 1)
  return [hook.state, setState]
}

function useEffect(fn, deps) {
  const wipFiber = getWipFiber()
  const hookIndex = getHookIndex()

  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex]

  const hasNoDeps = !deps;
  const hasChangedDeps = oldHook ? !deps.every((dep, i) => dep === oldHook.deps[i]) : true
  const hook = {
    deps,
    cleanup: oldHook ? oldHook.cleanup : undefined,
    fn,
    tag: hasNoDeps || hasChangedDeps ? 'EFFECT': null
  }
  wipFiber.hooks.push(hook)
  setHookIndex(hookIndex + 1)
}

export { useState, useEffect }
