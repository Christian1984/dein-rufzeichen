import { Table } from "@mantine/core";
import { useStore } from "../store/ZustandStore";

const ResultsView = () => {
    const availableCallsigns = useStore((state) => state.availableCallsigns);

    const classN = useStore((state) => state.includeClasses.n);
    const classE = useStore((state) => state.includeClasses.e);
    const classA = useStore((state) => state.includeClasses.a);
    // morsbarkeit
    // silbenlaenge phentic
    // phonie
    //
    // merken

    const ClassTable = ({ title, callsigns }: { title: string; callsigns: string[] }) => {
        const rows = callsigns.map((callsign) => (
            <Table.Tr key={callsign}>
                <Table.Td>{callsign}</Table.Td>
                <Table.Td>{callsign.length}</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
        ));

        return (
            <>
                <h1>{title}</h1>
                {rows.length > 0 && (
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Callsign</Table.Th>
                                <Table.Th>Länge</Table.Th>
                                <Table.Th>Morse-Code</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                )}
                {rows.length <= 0 && <span>keine Ergebnisse</span>}
            </>
        );
    };

    return (
        <>
            {classN && <ClassTable title="Klasse N" callsigns={availableCallsigns.n} />}
            {classE && <ClassTable title="Klasse E" callsigns={availableCallsigns.e} />}
            {classA && <ClassTable title="Klasse A" callsigns={availableCallsigns.a} />}
        </>
    );
};

export { ResultsView };
