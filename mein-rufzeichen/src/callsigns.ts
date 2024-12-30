type CallsignCombination = { letters: string; numbers: string[]; inactive?: boolean };

const prefixesClassN: CallsignCombination[] = [{ letters: "DN", numbers: ["9"] }];
const prefixesClassE: CallsignCombination[] = [
    { letters: "DA", numbers: ["6"] },
    { letters: "DO", numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
];
const prefixesClassA: CallsignCombination[] = [
    { letters: "DA", numbers: ["1", "2"] },
    { letters: "DB", numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
    { letters: "DC", numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] }, //0?
    { letters: "DD", numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] }, //0?
    { letters: "DF", numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
    { letters: "DG", numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] }, //0?
    { letters: "DH", numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] }, //0?
    { letters: "DJ", numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] },
    { letters: "DK", numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
    { letters: "DL", numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
    { letters: "DM", numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
];

const allSuffixes = () => {
    const alphabet = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];

    const l2 = alphabet.map((c1) => alphabet.map((c2) => c1 + c2)).flat();
    const l3 = alphabet.map((c1) => l2.map((c23) => c1 + c23)).flat();

    return [...l2, ...l3];
};

const allPrefixesPerClass = () => {
    return {
        n: prefixesClassN
            .map((combination) => combination.numbers.map((number) => combination.letters + number))
            .flat(),
        e: prefixesClassE
            .map((combination) => combination.numbers.map((number) => combination.letters + number))
            .flat(),
        a: prefixesClassA
            .map((combination) => combination.numbers.map((number) => combination.letters + number))
            .flat(),
    };
};

export const allCallsignsPerClass = () => {
    const prefixes = allPrefixesPerClass();
    const suffixes = allSuffixes();

    return {
        n: prefixes.n.map((prefix) => suffixes.map((suffix) => prefix + suffix)).flat(),
        e: prefixes.e.map((prefix) => suffixes.map((suffix) => prefix + suffix)).flat(),
        a: prefixes.a.map((prefix) => suffixes.map((suffix) => prefix + suffix)).flat(),
    };
};
