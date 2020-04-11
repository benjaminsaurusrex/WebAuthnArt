import * as d3 from "d3";

const scales = [
  ["A", "B", "C", "D", "E", "F", "G"],
  ["E", "F", "G#", "A", "B", "C", "D#"],
  ["C", "Db", "E", "F#", "G#", "A#", "B"],
  ["D", "E", "F#", "G", "A", "B", "C#"],
  ["F", "G", "A", "Bb", "C", "D", "E"],
  ["E", "G", "A", "Bb", "B", "D"]
];

// @ts-ignore
const scaleGenerator = d3.scaleQuantize().domain([0, 1]).range(scales);

export const getNoteGenerator = (random: () => number) => {
  // const scaleIndex = Math.floor(random() * scales.length) + 1;
  const scale = scaleGenerator(random()) as string[];
  const entireScaleRange = scale.reduce((allNotes, curr) => {
    allNotes.push(`${curr}2`);
    allNotes.push(`${curr}3`);
    allNotes.push(`${curr}4`);
    return allNotes;
  }, [] as string[]);
  // @ts-ignore
  const generator = d3.scaleQuantize().domain([0, 1]).range(entireScaleRange);
  return () => generator(random());
};
