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
