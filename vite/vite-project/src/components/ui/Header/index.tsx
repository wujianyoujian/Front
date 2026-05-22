import { useEffect, useState, lazy, useReducer, useContext, memo, Suspense } from "react";
import styles from "./index.module.scss";
import logoSrc from "@assets/hero.png";
import fib from "virtual:fib";
import env from "virtual:env";
// import Logo from "@assets/react.svg";
import { reducer } from "./useActions";
import { ThemeContext } from "../../../contexts/theme";
import useInterval from "./useInterval";

// import Worker from "./test.js?worker";

const Child = memo(() => {
  const theme = useContext(ThemeContext);
  console.log(theme);
  return <div>{theme}</div>;
});

const Test = lazy(() => import("../Test/index"));

export function Header() {
  const [showCount, setShowCount] = useState<boolean>(true);
  // const [context, setContext] = useState<string | number>(fib(20));
  const [res, dispatch] = useReducer(reducer, { result: 0 });
  const [count, setCount] = useState<number>(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  // const ref = useRef(null);

  // ref.current = () => {
  //   setCount(count + 1);
  // };

  // useEffect(() => {
  //   const timer = setInterval(() => ref.current(), 1000);

  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    // const worker = new Worker();
    // worker.addEventListener("message", (e) => {
    //   console.log(e);
    // });
    // return () => worker.terminate();
    // setContext();
    console.log(env);
  }, []);

  useEffect(() => {
    // const timer = setInterval(() => {
    // console.log(count);
    // setCount(count + 1);
    // setCount((count) => count + 1);
    // }, 1000);
    // return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* <Logo /> */}
      <div>{count}</div>
      <div>{res.result}</div>
      <button onClick={() => dispatch({ type: "add", num: 1 })}>+</button>
      <button onClick={() => dispatch({ type: "minus", num: 1 })}>-</button>

      <Suspense>
        <Test />
      </Suspense>

      <div>{fib(20)}</div>
      <img className={styles.img} src={logoSrc} alt="" />
      <p className={styles.header}>This is Header</p>
      <button onClick={() => setShowCount(!showCount)}>test</button>

      <Child />
    </>
  );
}
