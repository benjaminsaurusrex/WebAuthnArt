import * as d3 from "d3";
import * as React from "react";
import { makeAuthenticationChallenge } from "../auth";
import * as Tone from "tone";
import { getRandomFuncFromSeeds } from "../prng";
import { getNoteGenerator } from "./notes";
import { applyEffects } from "./effects";

const authenticate = async (
  // synth: Tone.Synth<Tone.SynthOptions>
  setCredential: (cred: PublicKeyCredential) => void
) => {
  const cred = await makeAuthenticationChallenge();
  if (!cred) {
    console.error("Oh crap, can't turn into notes");
    return;
  }

  setCredential(cred);
};

const getTimeGenerator = (random: () => number) => {
  const generator = d3
    .scaleQuantize()
    .domain([0, 1])
    .range([2, 1.75, 1.5, 1.25, 1, 0.75, 0.625, 0.5, 0.375, 0.25, 0.125]);

  return () => generator(random());
};

export const useUniverse = () => {
  const [cred, setCredential] = React.useState<PublicKeyCredential | null>(
    null
  );
  const [isReady, setIsReady] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [loop, setLoop] = React.useState<Tone.Loop | null>(null);
  const [synth] = React.useState<Tone.PolySynth>(
    new Tone.PolySynth({
      maxPolyphony: 24,
    }).toDestination()
  );
  const [getRandom, setRandomFunc] = React.useState<() => number>(
    () => Math.random
  );

  /**
   * Found new credentials, let's generate music notes
   * and art entropy seeds. Once we have these, we are
   * ready for playback!
   */
  React.useEffect(() => {
    if (!cred) {
      return;
    }

    // Create PRNG func using entropy of the credential.
    // @ts-ignore - types for PublicKeyCredential don't have an attestationObject
    const seeds = new Int32Array(cred.rawId);
    const random = getRandomFuncFromSeeds(
      seeds[0],
      seeds[1],
      seeds[2],
      seeds[3]
    );
    setRandomFunc(() => random);

    // Apply any effects
    applyEffects(synth, random);

    // Create loop of notes from the `rawId` ArrayBuffer
    // of the PublicKeyCredential. Use a Uint16Array to get a
    // sequence of "notes" that are hearable well when naively turned
    // into Hz frequency values below.
    const generateNote = getNoteGenerator(random);
    const generateTime = getTimeGenerator(random);

    const loop = new Tone.Loop((time) => {
      synth.triggerAttackRelease(
        generateNote(),
        generateTime(),
        time,
        random() * 0.25
      );
    }, 0.125);
    setLoop(loop);

    // Finally set that we're ready and bail!
    setIsReady(true);
  }, [cred, synth, setLoop]);

  /**
   * Callback used to authenticate and create
   * all of the necessary randomness used to seed
   * a new universe.
   */
  const createUniverse = React.useCallback(() => {
    authenticate(setCredential);
  }, [setCredential]);

  /**
   * Plays music and generates art!
   */
  const play = React.useCallback(() => {
    if (!loop) {
      return;
    }

    loop.start();
    Tone.start();
    Tone.Transport.start();
    setIsPlaying(true);
  }, [loop]);

  /**
   * Pauses music and ceases generating art!
   */
  const pause = React.useCallback(() => {
    if (!loop) {
      return;
    }

    loop.stop();
    Tone.Transport.stop();
    setIsPlaying(false);
  }, [loop]);

  /**
   * Get random color!
   */
  const getRandomColor = React.useCallback(
    () => ({
      r: getRandom() * 255,
      g: getRandom() * 255,
      b: getRandom() * 255,
      a: getRandom(),
    }),
    [getRandom]
  );

  /**
   * Callback used to reset the universe in preparation
   * for another one. This will stop all music.
   */
  const reset = React.useCallback(() => {
    pause();

    loop?.dispose();

    setCredential(null);
    setIsPlaying(false);
    setIsReady(false);
    setLoop(null);
    setRandomFunc(() => Math.random);
  }, [loop, pause, setCredential, setIsReady, setLoop]);

  return {
    createUniverse,
    getRandomColor,
    isPlaying,
    isReady,
    pause,
    play,
    random: getRandom,
    reset,
  };
};
