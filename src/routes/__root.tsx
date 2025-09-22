import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Container, MantineProvider } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "../theme";
import "@mantine/core/styles.css";
import Header from "../layout/Header";
import { PetContextProvider } from "../context/PetContext";

const RootLayout = () => (
  <>
    <MantineProvider theme={theme}>
      <PetContextProvider>
        <div className="flex flex-col min-h-screen gap-6">
          <Header />
          <main className="flex-1 flex justify-center">
            <Container size="lg" className="w-full">
              <Outlet />
            </Container>
          </main>
        </div>
      </PetContextProvider>
    </MantineProvider>

    <ReactQueryDevtools initialIsOpen={false} />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
