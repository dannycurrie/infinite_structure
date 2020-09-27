import { TAU } from '../constants';
import { filter } from 'rxjs/operators';

const colours = {
  bass: '#FF0000',
  synth0: '#00FF00',
  synth1: '#0000FF',
  synth2: '#00FFFF',
  synth3: '#FFFF00',
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

  let colour = '#000';

  const draw = () => {
    ctx.beginPath();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = colour;
    ctx.arc((0.5 + _x) | 0, (0.5 + _y) | 0, 15, 0, TAU, false);
    ctx.fill();
  };

  stream$
    .pipe(filter(({ note: streamNote }) => note === streamNote))
    .subscribe(({ id }) => {
      colour = colours[id];
      setTimeout(() => {
        colour = '#000';
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
