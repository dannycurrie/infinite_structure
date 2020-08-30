import * as Rx from 'rxjs';
import obGen from './utils/observe-generator';
import wrapGenerator from './utils/wrap-generator';
import model from './model';

const generator = wrapGenerator(model().perm);
const sub = new Rx.Subject();
const genStream = obGen(generator, sub);

const onNext = (val) => console.log('onNext', val);
const onError = (val) => console.log('onError', val);
const onComplete = () => console.log('done');

const click = Rx.fromEvent(document, 'click');

click.subscribe(genStream);
sub.subscribe(onNext, onError, onComplete);
