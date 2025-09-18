import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Pet from "./components/Pet";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      {/* <Header /> */}
      <Pet />
      <ReactQueryDevtools initialIsOpen={false} />
    </MantineProvider>
  );
}
