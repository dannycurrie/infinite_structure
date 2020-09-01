import * as Tone from 'tone';

export default ({ synth, notes, subDivision = '4n', length = '1n' }) => {
  const synthA = new Tone[synth]().toDestination();

  const synthPart = new Tone.Sequence(
    function (time, note) {
      synthA.triggerAttackRelease(note, subDivision, time);
    },
    notes,
    subDivision
  );

  return new Tone.Loop((time) => {
    synthPart.start(time);
  }, length).start(0);
};
