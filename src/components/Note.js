import { TAU } from '../constants';
import { filter } from 'rxjs/operators';
import theme from '../theme';

const colours = {
  bass: theme.one,
  synth0: theme.two,
  synth1: theme.three,
  synth2: theme.two,
  synth3: theme.three,
};

export default (
  canvas,
  ctx,
  { note, edges, startX, startY, startVelX, startVelY },
  stream$
) => {
  // init
  let _x = startX || Math.random() * canvas.width;
  let _y = startY || Math.random() * canvas.height;
  let vel = {
    x: startVelX || Math.random() * 2 - 1,
    y: startVelY || Math.random() * 2 - 1,
  };

  // functions
  const update = () => {
    if (_x > canvas.width + 50 || _x < -50) {
      vel.x = -vel.x;
    }
    if (_y > canvas.height + 50 || _y < -50) {
      vel.y = -vel.y;
    }
    _x += vel.x;
    _y += vel.y;
  };

  let colour = theme.white;

  const draw = () => {
    ctx.beginPath();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = colour;
    ctx.shadowBlur = 20;
    ctx.shadowColor = colour;
    ctx.arc((0.5 + _x) | 0, (0.5 + _y) | 0, 15, 0, TAU, false);
    ctx.fill();
  };

  stream$
    .pipe(filter(({ note: streamNote }) => note === streamNote))
    .subscribe(({ id }) => {
      colour = colours[id];
      setTimeout(() => {
        colour = theme.white;
      }, 500);
    });

  return {
    x: () => _x,
    y: () => _y,
    note,
    edges,
    draw,
    update,
  };
};
