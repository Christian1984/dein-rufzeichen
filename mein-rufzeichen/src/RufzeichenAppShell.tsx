import { useEffect } from "react";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InputArea } from "./components/InputArea";
import { useStore } from "./store/ZustandStore";
import { useShallow } from "zustand/shallow";
import { CallsignsData } from "./models/CallsignsData";
import { ResultsView } from "./components/ResultsView";
import { allCallsignsPerClass } from "./callsigns";

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
        const patternPrefix = callsignPattern.substring(0, 1);
        const patternNumeral = callsignPattern.substring(2, 2);
        const patternSuffix = callsignPattern.substring(3);
        debugger;

        let prefixes = allCallsignsPerClass();

        const candidatesN = prefixes.n.filter((candidate) => candidate.substring(3) == patternSuffix);
        const availableN = candidatesN.filter((candidate) => !existingCallsigns.includes(candidate));

        const candidatesE = prefixes.e.filter((candidate) => candidate.substring(3) == patternSuffix);
        const availableE = candidatesE.filter((candidate) => !existingCallsigns.includes(candidate));

        const candidatesA = prefixes.a.filter((candidate) => candidate.substring(3) == patternSuffix);
        const availableA = candidatesA.filter((candidate) => !existingCallsigns.includes(candidate));

        setAvailableCallsigns({ n: availableN, e: availableE, a: availableA });
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
            padding={0}>
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
