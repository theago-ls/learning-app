const breakPhrase = (
  words: {id: number; word: string | null}[],
  pivotId: number,
) => {
  const before = words
    .slice(
      0,
      words.findIndex(word => word.id === pivotId),
    )
    .map(({word}) => word)
    .join(' ');

  const after = words
    .filter(word => word.id > pivotId)
    .map(word => word.word)
    .join(' ');

  const pivot = words.find(word => word.id === pivotId)?.word;

  return {before, after, pivot};
};

export {breakPhrase};
