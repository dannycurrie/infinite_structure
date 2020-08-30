const next = (iter, observer, data) => {
  let item;

  try {
    item = iter.next(data);
  } catch (err) {
    return observer.error(err);
  }

  const value = item.value;

  if (item.done) {
    return observer.complete();
  }

  observer.next(value);
};

export default (fn, sub) => {
  const gen = fn();
  return (data) => {
    next(gen, sub, data);
  };
};
