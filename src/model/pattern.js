import * as Tone from 'tone';

export default ({
  synth,
  options,
  notes,
  subDivision = '4n',
  length = '1n',
}) => {
  const synthA = new Tone[synth](options).toDestination();

  const synthPart = new Tone.Sequence(
    function (time, note) {
      synthA.triggerAttackRelease(note, subDivision, time);
    },
    notes,
    subDivision
  );

  const loop = new Tone.Loop((time) => {
    synthPart.start(time);
  }, length).start(0);

  return {
    loop,
    synthPart,
  };
};
