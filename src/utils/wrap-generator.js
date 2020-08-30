export default (fn, cond = () => true) => {
  return function* (data) {
    while (cond(data)) {
      yield fn(data);
    }
  };
};
