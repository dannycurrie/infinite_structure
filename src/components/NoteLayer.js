import { ONE_FRAME } from '../constants';
import Note from './Note';

export default (element, notesGraph) => {
  // init
  const canvas = element.createElement('canvas');
  document.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const notes = notesGraph.map((data) =>
    Note(canvas, ctx, {
      ...data,
      startX: Math.random() * canvas.width,
      startY: Math.random() * canvas.height,
    })
  );

  times = [];
  const lastTime = Date.now();

  // css vars
  // element.style.setProperty('--var', 'initial value');

  const style = ``;

  const html = ``;

  element.innerHTML = `
    <style>
      ${style}
    </style>
    ${html}
    `;

  // functions
  const update = () => {
    var diff = Date.now() - lastTime;
    for (let frame = 0; frame * ONE_FRAME < diff; frame++) {
      notes.forEach((n) => n.update());
    }
    lastTime = Date.now();
  };

  const draw = () => {
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#001c33';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let note of notes) {
      note.draw();
      ctx.beginPath();
      for (let index2 = notes.length - 1; index2 > index; index2 += -1) {
        var note2 = notes[index2];
        var dist = Math.hypot(note.x - note2.x, note.y - note2.y);
        if (dist < 100) {
          ctx.strokeStyle = '#448fda';
          ctx.globalAlpha = 1 - (dist > 100 ? 0.8 : dist / 150);
          ctx.lineWidth = '2px';
          ctx.moveTo((0.5 + note.x) | 0, (0.5 + note.y) | 0);
          ctx.lineTo((0.5 + note2.x) | 0, (0.5 + note2.y) | 0);
        }
      }
      ctx.stroke();
    }
  };

  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    requestAnimationFrame(loop);
  };

  return {
    loop,
  };
};
