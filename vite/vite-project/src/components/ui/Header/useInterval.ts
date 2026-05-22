import { useEffect, useRef } from "react";

const useInterval = (fn: () => void, time: number) => {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  useEffect(() => {
    const timer = setInterval(() => ref.current(), time);

    return () => clearInterval(timer);
  }, [time]);
};

export default useInterval;
