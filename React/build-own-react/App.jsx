import MReact, {
  useEffect,
  useCallBack,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
} from "./src/MReact";

function Timer() {
  useEffect(() => {
    const id = setInterval(() => {
      console.log("tick", Date.now());
    }, 1000);

    return () => {
      clearInterval(id);
      console.log("Timer cleaned up");
    };
  }, []);

  return <p>Timer is running...</p>;
}

function App() {
  const [count, setCount] = useState(() => {
    console.log("count initial");
    return 1;
  });
  const [num, setNum] = useState(0);
  const [show, setShow] = useState(false);
  const domRef = useRef(null);

  const count1 = useMemo(() => {
    return num + "ces";
  }, [num]);

  const List = useMemo(() => {
    return (
      <div style={{ height: "400px", overflowY: "scroll" }}>
        {new Array(200000).fill(1).map((item, index) => {
          return <div className="list-item">{item + index}</div>;
        })}
      </div>
    );
  }, []);

  console.log(count1);

  useEffect(() => {
    console.log(123);
  }, []);

  useLayoutEffect(() => {
    console.log(12333);
  }, []);

  useLayoutEffect(() => {
    console.log(domRef);
  }, [domRef.current]);

  console.log("App render", count);

  return (
    <div ref={domRef}>
      <h1
        style={{ userSelect: "none" }}
        onClick={() => {
          setCount(count + 1);
          setCount(count + 2);
          setCount(count + 3);
        }}
      >
        {count}
      </h1>
      <h1 style={{ userSelect: "none" }} onClick={() => setNum((n) => n + 1)}>
        {num}
      </h1>
      <button onClick={() => setShow((s) => !s)}>
        {show ? "卸载 Timer" : "挂载 Timer"}
      </button>
      {show ? <Timer /> : <p>Timer unmounted</p>}
      {List}
    </div>
  );
}
export default App;
