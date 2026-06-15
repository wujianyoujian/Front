import MReact, { useState } from "../../libs/MReact/index";
import { useStore } from "../store";

function Index() {
  const { inc } = useStore();

  return <button onClick={inc}>inc</button>;
}

export default Index;
