import { Subject, fromEvent, interval, map } from 'rxjs';
import { mergeMap, mergeAll, tap } from 'rxjs/operators';
import obGen from './utils/observe-generator';
import wrapGenerator from './utils/wrap-generator';
import model from './model';
import * as Tone from 'tone';
import pattern from './model/pattern';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import Note from './components/Note';

const { nextPatterns, play, notes$ } = model(pattern);

const generator = wrapGenerator(nextPatterns);
const sub = new Subject();
const genStream = obGen(generator, sub);

let started = false;

const setup = () => {
  if (!started) Tone.Transport.start();
  started = true;
  console.log('started: ', started);
};
const onError = (err) => console.log('onError', err);

const click$ = fromEvent(document, 'click');

click$.subscribe(genStream);
click$.subscribe(setup);
sub.subscribe(play, onError);

const app = document.getElementById('app');
const cSharp = Note(app, { note: 'C#3' });

const notes = {
  Csharp3: cSharp,
};

const updateNotes = ({ id, note }) => {
  const noteName = note.replace('#', 'sharp');
  if (notes[noteName]) notes[noteName].update(id);
};

notes$
  .pipe(
    groupBy(({ id }) => id),
    mergeMap((inst$) => inst$.pipe(tap(updateNotes)))
  )
  .subscribe();
