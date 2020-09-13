export const thinSaw = {
  harmonicity: 0.5,
  modulationIndex: 1.2,
  oscillator: {
    type: 'fmsawtooth',
    modulationType: 'sine',
    modulationIndex: 20,
    harmonicity: 3,
  },
  envelope: {
    attack: 0.05,
    decay: 0.3,
    sustain: 0.1,
    release: 1.2,
  },
  modulation: {
    volume: 0,
    type: 'triangle',
  },
  modulationEnvelope: {
    attack: 0.35,
    decay: 0.1,
    sustain: 1,
    release: 0.01,
  },
};

export const cello = {
  harmonicity: 3.01,
  modulationIndex: 14,
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 0.2,
    decay: 0.3,
    sustain: 0.1,
    release: 1.2,
  },
  modulation: {
    type: 'square',
  },
  modulationEnvelope: {
    attack: 0.01,
    decay: 0.5,
    sustain: 0.2,
    release: 0.1,
  },
};

export const bass = {
  oscillator: {
    type: 'fmsquare5',
    modulationType: 'triangle',
    modulationIndex: 2,
    harmonicity: 0.501,
  },
  filter: {
    Q: 1,
    type: 'lowpass',
    rolloff: -24,
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.4,
    release: 2,
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.8,
    release: 1.5,
    baseFrequency: 50,
    octaves: 4.4,
  },
};

export const harmonics = {
  harmonicity: 3.999,
  oscillator: {
    type: 'square',
  },
  envelope: {
    attack: 0.03,
    decay: 0.3,
    sustain: 0.7,
    release: 0.8,
  },
  modulation: {
    volume: 12,
    type: 'square6',
  },
  modulationEnvelope: {
    attack: 2,
    decay: 3,
    sustain: 0.8,
    release: 0.1,
  },
};

export * from './chords';
