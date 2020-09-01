import * as Rx from 'rxjs';
import obGen from './utils/observe-generator';
import wrapGenerator from './utils/wrap-generator';
import model from './model';
import * as Tone from 'tone';
import pattern from './model/pattern';

const generator = wrapGenerator(model().perm);
const sub = new Rx.Subject();
const genStream = obGen(generator, sub);

const startAudio = () => Tone.Transport.start();
const onError = (err) => console.log('onError', err);
const onComplete = () => console.log('done');

const click = Rx.fromEvent(document, 'click');

click.subscribe(genStream);
click.subscribe(startAudio);
sub.subscribe(pattern, onError, onComplete);
