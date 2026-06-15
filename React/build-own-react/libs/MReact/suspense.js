import { getWipFiber } from "./reconciler.js";

function Suspense({ fallback, children }) {
  const fiber = getWipFiber();
  if (fiber._suspended) {
    return fallback;
  }
  return children;
}

export { Suspense };
