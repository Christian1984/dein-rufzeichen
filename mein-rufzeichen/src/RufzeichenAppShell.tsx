import { useEffect } from "react";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InputArea } from "./components/InputArea";
import { useStore } from "./store/ZustandStore";
import { useShallow } from "zustand/shallow";
import { CallsignsData } from "./models/CallsignsData";
import { ResultsView } from "./components/ResultsView";

function RufzeichenAppShell() {
  const [opened, { toggle }] = useDisclosure();

  const callsignPattern = useStore((state) => state.callsignPattern);
  const setExistingCallsignsUpdated = useStore((state) => state.setExistingCallsignsUpdated);
  const [existingCallsigns, setExistingCallsigns] = useStore(
    useShallow((state) => [state.existingCallsigns, state.setExistingCallsigns])
  );
  const setAvailableCallsigns = useStore((state) => state.setAvailableCallsigns);

  const loadCallsigns = async () => {
    const resp = await fetch("callsigns-data.json");
    const json = (await resp.json()) as CallsignsData;
    setExistingCallsigns(json.callsigns);
    setExistingCallsignsUpdated(json.updated);
  };

  useEffect(() => {
    loadCallsigns();
  }, []);

  const handleFindAvailableCallsigns = () => {
    const candidates = [callsignPattern];
    const available = candidates.filter((candidate) => !existingCallsigns.includes(candidate));
    setAvailableCallsigns(available);
  };

  return (
    <AppShell
      header={{ height: 48 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      styles={{ main: { height: "100%" } }}
      padding={0}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>dein rufzeichen (by DN9CVR)</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <InputArea onFindAvailableCallsignsClicked={handleFindAvailableCallsigns} />
      </AppShell.Navbar>

      <AppShell.Main style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ResultsView />
        {/* <ParksView call={call} parks={parks} mapCenter={qth} /> */}
      </AppShell.Main>
    </AppShell>
  );
}

export default RufzeichenAppShell;
