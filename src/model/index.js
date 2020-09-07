import * as Tone from 'tone';
import { bass, harmonics } from './presets';

const NOTES = [
  'C#',
  'D',
  'E',
  'F#',
  'G#',
  'A',
  'B',
  ['C#3', 'E3'],
  ['B3', 'A3'],
];

const feedbackDelay = new Tone.FeedbackDelay('8n', 0.5);
const chorus = new Tone.Chorus(4, 2.5, 0.5);
const reverb = new Tone.Reverb({
  decay: 8,
  wet: 0.6,
  preDelay: 0.4,
});

const SUB_DIVS = ['1n', '2n', '3n', '4n'];

const getRandomIndex = (l) => Math.trunc(Math.random() * l);

const getRandomNote = () => {
  const note = NOTES[getRandomIndex(NOTES.length)];
  if (Array.isArray(note)) return note;
  return `${note}3`;
};

const getRandomNotes = () =>
  [...Array(getRandomIndex(10)).keys()].map(getRandomNote);

const getRandomDivision = () => SUB_DIVS[getRandomIndex(SUB_DIVS.length)];

const changed = (pattern) => pattern.changed;

const setChanged = (pattern) => {
  pattern.changed = false;
  return pattern;
};

const stopLoop = (loop) => {
  loop.synthPart.stop();
  loop.synthPart.dispose();
  loop.loop.stop();
  loop.loop.dispose();
};

export default (playFn) => {
  let patterns = [];
  let loops = [];
  let play = () =>
    (loops = patterns.filter(changed).map(setChanged).map(playFn));

  // bass pattern
  patterns.push({
    synth: 'MonoSynth',
    options: bass,
    notes: getRandomNotes(),
    subDivision: getRandomDivision(),
    changed: true,
  });

  for (let i = 0; i < 3; i++) {
    patterns.push({
      synth: 'AMSynth',
      options: harmonics,
      effects: [chorus, feedbackDelay, reverb],
      notes: getRandomNotes(),
      subDivision: getRandomDivision(),
      changed: true,
    });
  }

  const perm = () => {
    // pick a random loop
    const i = getRandomIndex(patterns.length);
    patterns[i] = { ...patterns[i], notes: getRandomNotes(), changed: true };
    const loop = loops[i];
    if (loop) stopLoop(loop);
  };

  return {
    perm,
    play,
  };
};
