export default () => {
  let m = 0;

  const perm = () => {
    m = Math.random();
    return m;
  };

  return {
    perm,
  };
};
