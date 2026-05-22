import { useEffect, useRef, useState, type MouseEvent } from "react";

const Test = () => {
  console.log("render");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(ref.current);
  }, []);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e);
    // use functional updates to ensure correct increments
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return (
    <div data-test={12}>
      <div ref={ref} onClick={handleClick}>
        test1 {count}
      </div>
    </div>
  );
};

export default Test;
