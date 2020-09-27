import * as Tone from 'tone';

export default ({
  id,
  synth,
  options,
  effects = [],
  notes,
  subDivision = '4n',
  callback = () => {},
}) => {
  const synthA = new Tone[synth](options);

  const chain = [synthA, ...effects];

  if (chain.length > 1) {
    for (let i = 1; i < chain.length; i++) {
      chain[i - 1].connect(chain[i]);
    }
  }
  chain[chain.length - 1].connect(Tone.Master);

  const synthPart = new Tone.Sequence(
    function (time, note) {
      synthA.triggerAttackRelease(note, subDivision, time);
      callback({ note, id, synth });
    },
    notes,
    subDivision
  );

  const loop = new Tone.Loop((time) => {
    synthPart.start(time);
  }).start(0);

  return {
    loop,
    synthPart,
  };
};
