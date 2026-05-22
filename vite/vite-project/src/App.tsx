// import Index from "./pages/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/index"));
const Second = lazy(() => import("./pages/second"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/test",
    element: <Second />,
  },
]);

function App() {
  return (
    <Suspense>
      <RouterProvider router={routes}></RouterProvider>;
    </Suspense>
  );
}

export default App;
