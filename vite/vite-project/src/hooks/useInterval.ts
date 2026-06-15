import { useEffect, useRef } from "react";

function useInterval(fn, delay) {
  const callbackFn = useRef(fn);

  callbackFn.current = fn;

  useEffect(() => {
    const timer = setInterval(() => callbackFn.current(), delay);

    return () => clearInterval(timer);
  });
}

export { useInterval };
