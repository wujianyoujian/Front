// import Index from "./pages/index";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Suspense } from "react";
import Index from "@src/pages/index";
import Second from "@src/pages/second";
import { BrowserRouter, Link, Outlet, Routes } from "./MyRoute";
import type { RouteConfig } from "./MyRoute/interface";

// const Index = lazy(() => import("./pages/index"));
// const Second = lazy(() => import("./pages/second"));

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <Index />,
//   },
//   {
//     path: "/test",
//     element: <Second />,
//   },
// ]);
function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">index</Link>
        <p></p>
        <Link to="/second">second</Link>
      </nav>
      <Outlet />
    </div>
  );
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "second",
        element: <Second />,
      },
    ],
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes routes={routes} />
    </BrowserRouter>
  );
}

export default App;
