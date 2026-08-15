import MReact, { useState } from "../libs/MReact";

function Test() {
  const [count, setState] = useState(12);

  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          setState(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

export default Test;
