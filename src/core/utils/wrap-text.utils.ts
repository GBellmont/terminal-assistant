const wrapText = (text: string, lineWidth: number): string => {
  const words = text.split(" ");

  return words.reduce((acumulator, currentWord) => {
    const lastLine = acumulator.split("\n").at(-1);

    if (lastLine.length + currentWord.length > lineWidth)
      return `${acumulator}\n${currentWord}`;

    return !acumulator.length ? currentWord : `${acumulator} ${currentWord}`;
  }, "");
};

export { wrapText };
