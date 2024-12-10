import { Button, Checkbox, Divider, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { useStore } from "../store/ZustandStore";
import { useShallow } from "zustand/shallow";

const InputArea = ({
  onFindAvailableCallsignsClicked: onFindCallsignsClicked,
}: {
  onFindAvailableCallsignsClicked: () => void;
}) => {
  const [callsignPattern, setCallsignPattern] = useStore(
    useShallow((state) => [state.callsignPattern, state.setCallsignPattern])
  );

  const existingCallsignsUpdated = useStore((state) => state.existingCallsignsUpdated);

  const [classN, setClassN] = useStore(useShallow((state) => [state.includeClasses.n, state.includeClasses.setN]));
  const [classE, setClassE] = useStore(useShallow((state) => [state.includeClasses.e, state.includeClasses.setE]));
  const [classA, setClassA] = useStore(useShallow((state) => [state.includeClasses.a, state.includeClasses.setA]));

  return (
    <>
      <TextInput
        label="Wunschrufzeichen"
        type="text"
        placeholder="DN9CVR"
        description={
          <>
            * = beliebiges Zeichen
            <br />$ = gleiche Zeichen
            <br />
            Beispiel: D$*$$ = DL1LL, DO3OO etc.
          </>
        }
        inputWrapperOrder={["label", "error", "input", "description"]}
        value={callsignPattern}
        onChange={(e) => setCallsignPattern(e.target.value)}
      />

      <Divider my="xs" label="Klassen" labelPosition="left" />

      <Stack>
        <Checkbox label="Klasse N" checked={classN} onChange={(e) => setClassN(e.target.checked)} />
        <Checkbox label="Klasse E" checked={classE} onChange={(e) => setClassE(e.target.checked)} />
        <Checkbox label="Klasse A" checked={classA} onChange={(e) => setClassA(e.target.checked)} />
      </Stack>

      <Divider my="xs" label="Sonstiges" labelPosition="left" />

      <Checkbox label="Suffix in allen Klassen verfügbar" />

      <Group justify="flex-end" mt="md">
        <Button type="button" onClick={onFindCallsignsClicked} disabled={callsignPattern.length < 1}>
          Rufzeichen suchen
        </Button>
      </Group>

      <Stack justify="flex-end" style={{ flexGrow: 1 }}>
        <Text size="xs">Datenstand vom {existingCallsignsUpdated}</Text>
      </Stack>
    </>
  );
};
export { InputArea };
