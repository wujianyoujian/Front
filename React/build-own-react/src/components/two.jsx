import MReact, { useState } from "../../libs/MReact/index";
import { useStore } from "../store";

function Index() {
  const { dec } = useStore();

  return <button onClick={dec}>inc</button>;
}

export default Index;
