import { useContext } from "react";
import { RouterContext } from "./context";

export function useParams() {
  return useContext(RouterContext).params;
}

