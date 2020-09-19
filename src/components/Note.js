import { TAU } from '../constants';

export default (
  canvas,
  ctx,
  { note, edges, startX, startY, startVelX, startVelY }
) => {
  // init
  let x = startX || Math.random() * canvas.width;
  let y = startY || Math.random() * canvas.height;
  let vel = {
    x: startVelX || Math.random() * 2 - 1,
    y: startVelY || Math.random() * 2 - 1,
  };

  // functions
  const update = () => {
    if (x > canvas.width + 50 || x < -50) {
      vel.x = -vel.x;
    }
    if (y > canvas.height + 50 || y < -50) {
      vel.y = -vel.y;
    }
    x += vel.x;
    y += vel.y;
  };

  const draw = () => {
    ctx.beginPath();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#000';
    ctx.arc((0.5 + x) | 0, (0.5 + y) | 0, 3, 0, TAU, false);
    ctx.fill();
    ctx.fillText(note, x, y);
  };

  return {
    x,
    y,
    note,
    edges,
    draw,
    update,
  };
};
