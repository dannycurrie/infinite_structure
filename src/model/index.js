import * as Tone from 'tone';

const NOTES = [
  // 'C',
  'C#',
  // 'Cx',
  // 'Dbb',
  // 'Db',
  'D',
  // 'D#',
  // 'Dx',
  // 'Ebb',
  // 'Eb',
  'E',
  // 'E#',
  // 'Ex',
  // 'Fbb',
  // 'Fb',
  // 'F',
  'F#',
  // 'Fx',
  // 'Gbb',
  // 'Gb',
  // 'G',
  'G#',
  // 'Gx',
  // 'Abb',
  // 'Ab',
  'A',
  // 'A#',
  // 'Ax',
  // 'Bbb',
  // 'Bb',
  'B',
  // 'B#',
  // 'Bx',
  ['C#3', 'E3'],
  ['B3', 'A3'],
];

const getRandomNote = () => {
  const note = NOTES[Math.trunc(Math.random() * NOTES.length)];
  if (Array.isArray(note)) return note;
  return `${note}3`;
};

const getRandomNotes = () =>
  [...Array(Math.trunc(Math.random() * 10)).keys()].map(getRandomNote);

export default (playFn) => {
  let patterns = [];
  let loops = [];
  let play = () => (loops = patterns.map(playFn));

  for (let i = 0; i < 3; i++) {
    patterns.push({
      synth: 'FMSynth',
      notes: getRandomNotes(),
    });
  }

  const perm = () => {
    patterns = patterns.map((p) => ({ ...p, notes: getRandomNotes() }));
  };

  return {
    perm,
    play,
  };
};
