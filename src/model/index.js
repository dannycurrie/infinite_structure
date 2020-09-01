import pattern from './pattern';

const NOTES = [
  'C',
  'C#',
  'Cx',
  'Dbb',
  'Db',
  'D',
  'D#',
  'Dx',
  'Ebb',
  'Eb',
  'E',
  'E#',
  'Ex',
  'Fbb',
  'Fb',
  'F',
  'F#',
  'Fx',
  'Gbb',
  'Gb',
  'G',
  'G#',
  'Gx',
  'Abb',
  'Ab',
  'A',
  'A#',
  'Ax',
  'Bbb',
  'Bb',
  'B',
  'B#',
  'Bx',
];

const getRandomNote = () =>
  `${NOTES[Math.trunc(Math.random() * NOTES.length)]}${Math.trunc(
    Math.random() * 6
  )}`;

const getRandomNotes = () =>
  [...Array(Math.trunc(Math.random() * 10)).keys()].map(getRandomNote);

export default () => {
  const perm = () => {
    return {
      synth: 'FMSynth',
      notes: getRandomNotes(),
    };
  };

  return {
    perm,
  };
};
