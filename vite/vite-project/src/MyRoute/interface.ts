export type RouteConfig = {
  path?: string;
  element: React.ReactNode;
  children?: RouteConfig[];
  index?: boolean;
};
