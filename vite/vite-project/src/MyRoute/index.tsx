import React, { useState, useEffect, type ReactNode, useContext } from "react";
import { matchPath, matchRoutes } from "./util";
import { OutletContext, RouterContext } from "./context";
import type { RouteConfig } from "./interface";

interface BrowserRouterProps {
  children: ReactNode;
}

export function BrowserRouter(props: BrowserRouterProps) {
  const { children } = props;
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  console.log(window.location.pathname);

  return (
    <RouterContext.Provider value={{ pathname, params: {} as Record<string, string> }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Route({ path, element }: { path: string; element: React.ReactNode }) {
  const { pathname } = useContext(RouterContext);
  const match = matchPath(path, pathname);

  if (!match) return null;

  return (
    <RouterContext.Provider
      value={{
        pathname,
        params: match.params,
      }}
    >
      {element}
    </RouterContext.Provider>
  );
}

export function Link({ to, children }: { to: string; children: React.ReactNode }) {
  const handleClick = (e) => {
    e.preventDefault();
    window.history.pushState(null, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export function Routes({ routes }: { routes: RouteConfig[] }) {
  const { pathname } = useContext(RouterContext);
  const matches = matchRoutes(routes, pathname);
  console.log(matches);

  if (!matches) return null;

  return matches.reduceRight((outlet, { route, params }) => {
    return (
      <RouterContext.Provider value={{ pathname, params }}>
        <OutletContext.Provider value={outlet}>{route.element}</OutletContext.Provider>
      </RouterContext.Provider>
    );
  }, null);
}

export function Outlet() {
  return useContext(OutletContext);
}
