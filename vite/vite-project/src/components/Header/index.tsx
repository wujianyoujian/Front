import { useState } from "react";
import style from "./index.module.scss";

const Test = ({ showCount }) => {
  const [count, setCount] = useState<number>(0);

  if (showCount) {
    const [name, setName] = useState<string>("Tom");
  }
  const [age, setAge] = useState<number>(1);

  return (
    <div>
      {count} {age}
    </div>
  );
};

export function Header() {
  const [showCount, setShowCount] = useState<boolean>(true);

  return (
    <>
      <p className={style.header}>This is Header</p>
      <button onClick={() => setShowCount(!showCount)}>test</button>
      <Test showCount={showCount} />
    </>
  );
}
