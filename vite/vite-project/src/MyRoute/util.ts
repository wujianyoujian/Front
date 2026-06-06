import type { RouteConfig } from "./interface";

export function compilePath(path: string) {
  const paramNames: string[] = [];

  // 把 :id 替换成捕获组
  const regexStr = path.replace(/:([^/]+)/g, (_, name) => {
    paramNames.push(name);
    return "([^/]+)";
  });

  const regex = new RegExp(`^${regexStr}$`);
  return { regex, paramNames };
}

export function matchPath(pattern: string, pathname: string) {
  const { regex, paramNames } = compilePath(pattern);
  const match = pathname.match(regex);

  if (!match) return null;

  const params: Record<string, string> = {};
  paramNames.forEach((name, i) => {
    params[name] = match[i + 1];
  });

  return { params };
}

export function matchRoutes(routes: RouteConfig[], pathname: string, parentPath = "/") {
  for (const route of routes) {
    if (route.index) continue;

    const fullPath = joinPaths(parentPath, route.path!);
    const match = matchPath(fullPath, pathname);

    if (match) {
      if (route.children) {
        const childMatches = matchRoutes(route.children, pathname, fullPath);
        if (childMatches) {
          return [{ route, params: match.params }, ...childMatches];
        }
        const indexRoute = route.children.find((c) => c.index);
        if (indexRoute) {
          return [
            { route, params: match.params },
            { route: indexRoute, params: {} },
          ];
        }
      }
      return [{ route, params: match.params }];
    }
    if (route.children) {
      const childMatches = matchRoutes(route.children, pathname, fullPath);
      if (childMatches) {
        return [{ route, params: {} }, ...childMatches];
      }
    }
  }
  return null;
}

export function joinPaths(parent: string, child: string) {
  if (!child || child === "/") return parent;
  if (parent === "/") return "/" + child;
  return parent + "/" + child;
}
