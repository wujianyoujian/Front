import MReact, { useState } from "../libs/MReact";
import One from "./components/one";
import Two from "./components/two";

import { useStore } from "./store";

function Index() {
  const { count } = useStore();

  return (
    <>
      {count}
      <h2>One</h2>
      <One></One>
      <h2>Two</h2>
      <Two></Two>
      <h2>Three</h2>
    </>
  );
}

export default Index;
