import * as Rx from 'rxjs';

const next = (iter, observer) => {
  let item;

  try {
    item = iter.next();
  } catch (err) {
    return observer.error(err);
  }

  const value = item.value;

  if (item.done) {
    return observer.complete();
  }

  observer.next(value);
};

const ogen = (fn, sub) => {
  const gen = fn();
  return (args) => {
    next(gen, sub);
  };
};

function* gen() {
  var index = 0;
  while (index < 100) yield index++;
}

const sub = new Rx.Subject();

const genObs = ogen(gen, sub);

const onNext = (val) => console.log('onNext', val);
const onError = (val) => console.log('onError', val);
const onComplete = () => console.log('done');

const click = Rx.fromEvent(document, 'click');

click.subscribe(genObs);
sub.subscribe(onNext, onError, onComplete);
