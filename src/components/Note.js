import { TAU } from '../constants';

export default (
  canvas,
  ctx,
  { note, edges, startX, startY, startVelX, startVelY }
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

  const draw = () => {
    ctx.beginPath();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#000';
    ctx.arc((0.5 + _x) | 0, (0.5 + _y) | 0, 50, 0, TAU, false);
    ctx.fill();
    ctx.fillText(note, _x, _y);
  };

  return {
    x: () => _x,
    y: () => _y,
    note,
    edges,
    draw,
    update,
  };
};
