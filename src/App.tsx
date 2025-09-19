import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Pet from "./components/Pet";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./layout/Header";
import { PetContextProvider } from "./context/PetContext";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <PetContextProvider>
        <Header />
        <Pet />
      </PetContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </MantineProvider>
  );
}
