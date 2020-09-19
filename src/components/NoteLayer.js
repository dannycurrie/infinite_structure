import { ONE_FRAME } from '../constants';
import Note from './Note';

export default (element, notesGraph) => {
  // init
  const canvas = document.createElement('canvas');
  element.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const notes = Object.values(notesGraph).map((data) =>
    Note(canvas, ctx, {
      ...data,
      startX: Math.random() * canvas.width,
      startY: Math.random() * canvas.height,
    })
  );
  const notesLookup = notes.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.note]: curr,
    }),
    {}
  );

  // functions
  let lastTime = Date.now();
  const update = () => {
    const diff = Date.now() - lastTime;
    for (let frame = 0; frame * ONE_FRAME < diff; frame++) {
      notes.forEach((n) => n.update());
    }
    lastTime = Date.now();
  };

  const draw = () => {
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw particles
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      note.update();
      note.draw();

      // Draw connections
      for (let edge of note.edges) {
        const edgeNote = notesLookup[edge];
        ctx.beginPath();
        ctx.strokeStyle = '#000';
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 0.7;
        ctx.moveTo(note.x, note.y);
        ctx.lineTo(edgeNote.x, edgeNote.y);
        ctx.stroke();
      }
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
