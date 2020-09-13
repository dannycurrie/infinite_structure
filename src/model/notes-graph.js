const makeCreateNote = (cache) => (key) => {
  cache[key] = {
    note: key,
    edges: new Set(),
  };
  return cache[key];
};

export default (chords) => {
  const notes = {};

  const create = makeCreateNote(notes);

  for (let chord of chords) {
    for (let i = 0; i < chord.length; i++) {
      const note = chord[i];
      if (!notes[note]) create(note);
      if (i > 0) {
        const prev = notes[chord[i - 1]];
        prev.edges.add(note);
      }
    }
  }

  return notes;
};
