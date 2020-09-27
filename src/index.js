import { Subject, fromEvent } from 'rxjs';
import { mergeMap, tap, share, take } from 'rxjs/operators';
import observableGenerator from './utils/observe-generator';
import wrapGenerator from './utils/wrap-generator';
import model from './model';
import * as Tone from 'tone';
import pattern from './model/pattern';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import NoteLayer from './components/NoteLayer';

// init model
const { nextPatterns, play, notes$, graph } = model(pattern);

// set up streams
const patternGenerator = wrapGenerator(nextPatterns);
const patternSubject = new Subject();
const genStream = observableGenerator(patternGenerator, patternSubject);

const setup = () => {
  Tone.Transport.start();
};

const click$ = fromEvent(document, 'click').pipe(share());
const setup$ = click$.pipe(take(1));

// subscriptions
click$.subscribe(genStream);

setup$.subscribe(
  () => {},
  () => {},
  setup
);

patternSubject.subscribe(play);

const app = document.getElementById('app');
const noteLayer = NoteLayer(app, graph, notes$);
// go
noteLayer.loop();
