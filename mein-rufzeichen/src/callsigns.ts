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

const lettersMatchInput = (inputLetters: string, letters: string) => {
  return letters == inputLetters;
};

const numbersMatchInput = (inputNumber: string, numbers: string[]) => {
  return numbers.includes(inputNumber);
};

const permutate = (inputLetters: string, inputNumber: string, combinations: CallsignCombination[]) => {
  return combinations
    .filter(
      (combination) => lettersMatchInput(inputLetters, combination.letters) && numbersMatchInput(inputNumber, combination.numbers)
    )
    .map((combination) => combination.numbers.map((number) => combination.letters + number))
    .flat();
};

export const permutateClassN = (inputLetters: string, inputNumber: string) =>
  permutate(inputLetters, inputNumber, prefixesClassN);
export const permutateClassE = (inputLetters: string, inputNumber: string) =>
  permutate(inputLetters, inputNumber, prefixesClassE);
export const permutateClassA = (inputLetters: string, inputNumber: string) =>
  permutate(inputLetters, inputNumber, prefixesClassA);

const getPrefixCandidates = (n: boolean, e: boolean, a: boolean, enteredPrefix: string) => {
  const inputLetters = enteredPrefix.substring(0, 2);
  const inputNumber = enteredPrefix.substring(2, 3);

  const nPermutations = n ? permutateClassN(inputLetters, inputNumber) : [];
  const ePermutations = e ? permutateClassE(inputLetters, inputNumber) : [];
  const aPermutations = a ? permutateClassA(inputLetters, inputNumber) : [];

  const prefixes = [...nPermutations, ...ePermutations, ...aPermutations];
};
