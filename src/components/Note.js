export default (element, { note, edges }) => {
  // css vars
  // element.style.setProperty('--var', 'initial value');

  const style = ``;

  const html = `
    <div>${note}</div>
    `;

  element.innerHTML = `
    <style>
      ${style}
    </style>
    ${html}
    `;

  // elements
  const node = element.querySelector('div');

  // functions
  const update = () => {};

  // event listeners
};