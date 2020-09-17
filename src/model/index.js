import * as Tone from 'tone';
import { Subject } from 'rxjs';
import { bass, harmonics, cello } from './presets';
import chords from './presets/chords';
import notesGraph from './notes-graph';

const NOTES = [
  'C#',
  'D',
  'E',
  'F#',
  'G#',
  ['D3', 'E3', 'C#3'],
  'A',
  'B',
  ['C#3', 'E3'],
  ['B3', 'A3'],
];

const feedbackDelay = new Tone.FeedbackDelay('8n', 0.5);
const chorus = new Tone.Chorus(4, 2.5, 0.5);
const reverb = new Tone.Reverb({
  decay: 5,
  wet: 0.3,
  preDelay: 0.4,
});

const SUB_DIVS = [
  '1m',
  '1n',
  '1n.',
  '2n',
  '2n.',
  '2t',
  '4n',
  '4n.',
  '4t',
  '8n',
  '8n.',
  '8t',
];

const SYNTHS = ['MonoSynth', 'AMSynth', 'FMSynth'];

const INSTRUMENTS = [bass, harmonics, cello];

const getRandomIndex = (l) => Math.trunc(Math.random() * l);

const notes$ = new Subject();

const getRandomNote = () => {
  const note = NOTES[getRandomIndex(NOTES.length)];
  if (Array.isArray(note)) return note;
  return `${note}3`;
};

const getRandomNotes = () =>
  [...Array(getRandomIndex(10)).keys()].map(getRandomNote);

const getRandomDivision = () => SUB_DIVS[getRandomIndex(SUB_DIVS.length)];

const getRandomInstrument = () =>
  INSTRUMENTS[getRandomIndex(INSTRUMENTS.length)];

const getRandomSynth = () => SYNTHS[getRandomIndex(SYNTHS.length)];

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

  const bassLine = chords.reduce((acc, curr) => acc.concat(curr), []);

  const notePlayed = (note) => notes$.next(note);

  // bass pattern
  patterns.push({
    id: 'bass',
    synth: 'MonoSynth',
    options: bass,
    effects: [reverb],
    notes: bassLine,
    subDivision: '8n',
    callback: notePlayed,
    changed: true,
  });

  for (let i = 0; i < 3; i++) {
    patterns.push({
      id: `synth${i}`,
      synth: getRandomSynth(),
      options: getRandomInstrument(),
      effects: [feedbackDelay, reverb],
      notes: getRandomNotes(),
      subDivision: getRandomDivision(),
      callback: notePlayed,
      changed: true,
    });
  }

  const nextPatterns = () => {
    // pick a random loop
    const i = getRandomIndex(patterns.length);
    patterns[i] = {
      ...patterns[i],
      notes: getRandomNotes(),
      subDivision: getRandomDivision(),
      changed: true,
    };
    const loop = loops[i];
    if (loop) stopLoop(loop);
  };

  return {
    nextPatterns,
    notes$,
    play,
  };
};
