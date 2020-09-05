import * as Rx from 'rxjs';
import obGen from './utils/observe-generator';
import wrapGenerator from './utils/wrap-generator';
import model from './model';
import * as Tone from 'tone';
import pattern from './model/pattern';

const m = model(pattern);

const generator = wrapGenerator(m.perm);
const sub = new Rx.Subject();
const genStream = obGen(generator, sub);

let started = false;

const setup = () => {
  if (!started) Tone.Transport.start();
  started = true;
};
const onError = (err) => console.log('onError', err);

const click = Rx.fromEvent(document, 'click');

click.subscribe(genStream);
click.subscribe(setup);
sub.subscribe(m.play, onError);
