import "@mantine/core/styles.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import NotFound from "./components/NotFound";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
