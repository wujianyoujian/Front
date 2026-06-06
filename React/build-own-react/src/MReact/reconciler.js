import { createDom, updateDom } from "./dom.js";

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = null;
// hooks state — shared with hooks.js via module-level vars
let wipFiber = null;
let workInProgressHook = null;
let currentHook = null;
let totalCount = 0;
// let hookIndex = null

function render(element, container) {
  wipRoot = {
    dom: container,
    props: { children: [element] },
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  commitLayoutEffect(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
  requestIdleCallback(() => commitEffect(currentRoot.child));
}

function commitEffect(fiber) {
  if (!fiber) return;
  let stack = [];

  while (stack.length) {
    let f = stack.pop();
    let hook = f.memoizedState;
    while (hook) {
      if (hook.tag === "EFFECT") {
        if (hook.cleanup) hook.cleanup();
        hook.cleanup = hook.fn();
      }
      hook = hook.next;
    }
    if (f.sibling) stack.push(f.sibling);
    if (f.child) stack.push(f.child);
  }
}

function commitLayoutEffect(fiber) {
  if (!fiber) return;
  let stack = [fiber];

  while (stack.length) {
    let f = stack.pop();
    let hook = f.memoizedState;
    while (hook) {
      if (hook.tag === "LAYOUTEFFECT") {
        if (hook.cleanup) hook.cleanup();
        hook.cleanup = hook.fn();
      }
      hook = hook.next;
    }
    if (f.sibling) stack.push(f.sibling);
    if (f.child) stack.push(f.child);
  }
}

function commitWork(fiber) {
  if (!fiber) return;

  const stack = [fiber];

  while (stack.length) {
    console.log("totalCount:", ++totalCount);
    const f = stack.pop();
    let domParentFiber = f.parent;
    while (!domParentFiber.dom) {
      domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;

    if (f.effectTag === "PLACEMENT" && f.dom != null) {
      domParent.appendChild(f.dom);
      if (f.props.ref) {
        f.props.ref.current = f.dom;
      }
    } else if (f.effectTag === "UPDATE" && f.dom != null) {
      updateDom(f.dom, f.alternate.props, f.props);
      if (f.props.ref) {
        f.props.ref.current = f.dom;
      }
    } else if (f.effectTag === "DELETION") {
      commitDeletion(fiber, domParent);
    }
    if (f.sibling) stack.push(f.sibling);
    if (f.child) stack.push(f.child);
  }
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
  let hook = fiber.memoizedState;
  while (hook) {
    if (hook.cleanup) hook.cleanup();
    hook = hook.next;
  }
}

function completeWork(fiber) {
  if (typeof fiber.type === "string" && !fiber.dom) {
    fiber.dom = createDom(fiber);
  }
}

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;

  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  if (fiber.child) return fiber.child;

  let nextFiber = fiber;
  while (nextFiber) {
    completeWork(nextFiber);
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

function updateHostComponent(fiber) {
  reconcileChildren(fiber, fiber.props.children);
}

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  wipFiber.memoizedState = null; // 链表头，初始为空
  workInProgressHook = null;
  currentHook = fiber.alternate?.memoizedState ?? null;
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) oldFiber = oldFiber.sibling;

    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

function scheduleRerender() {
  if (wipRoot) return;

  const newWipRoot = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot,
  };
  setWipRoot(newWipRoot);
  setNextUnitOfWork(newWipRoot);
  setDeletions([]);
}

function getWipFiber() {
  return wipFiber;
}
function getWorkInProgressHook() {
  return workInProgressHook;
}
function setWorkInProgressHook(hook) {
  workInProgressHook = hook;
}
function getCurrentHook() {
  return currentHook;
}
function setCurrentHook(hook) {
  currentHook = hook;
}
function getWipRoot() {
  return wipRoot;
}
function setWipRoot(root) {
  wipRoot = root;
}
function getCurrentRoot() {
  return currentRoot;
}
function setNextUnitOfWork(fiber) {
  nextUnitOfWork = fiber;
}
function setDeletions(d) {
  deletions = d;
}

export {
  render,
  getWipFiber,
  getWorkInProgressHook,
  setWorkInProgressHook,
  getCurrentHook,
  setCurrentHook,
  getWipRoot,
  setWipRoot,
  getCurrentRoot,
  setNextUnitOfWork,
  setDeletions,
  scheduleRerender,
};
