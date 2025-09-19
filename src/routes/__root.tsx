import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Container, MantineProvider } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "../theme";
import "@mantine/core/styles.css";
import { PetContextProvider } from "../context/PetContext";
import Header from "../layout/Header";

const RootLayout = () => (
  <>
    <MantineProvider theme={theme}>
      <PetContextProvider>
        <Header />
        <Container size="lg" className="py-6">
          <Outlet />
        </Container>
      </PetContextProvider>
    </MantineProvider>

    <ReactQueryDevtools initialIsOpen={false} />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
