import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import RufzeichenAppShell from "./RufzeichenAppShell";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RufzeichenAppShell />
    </MantineProvider>
  );
}
