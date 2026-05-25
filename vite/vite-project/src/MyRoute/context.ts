import { createContext } from "react";

export const RouterContext = createContext({
  pathname: "/",
  params: {} as Record<string, string>,
});

export const OutletContext = createContext<React.ReactNode>(null);
