import * as Tone from "tone";

type RandomGenerator = () => number;

export const applyEffects = (
  synth: Tone.PolySynth,
  random: RandomGenerator
) => {
  synth.connect(getPhaser(random));
};

// const getTremoloEffect = (random: RandomGenerator) => {
//   return new Tone.Tremolo(Math.floor(random() * 11) + 1, random())
//     .toDestination()
//     .start();
// };

const getPhaser = (random: RandomGenerator) => {
  return new Tone.Phaser({
    frequency: random() * 0.5
  }).toDestination();
};

// const getChorus = (random: RandomGenerator) => {
//   return new Tone.Chorus().toDestination();
// };
