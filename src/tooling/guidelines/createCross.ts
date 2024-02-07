import createSVGElement from '../../utils/createSVGElement';

const RADIUS = 3;
const DIAMETER = 2 * RADIUS;
const linesCoefficients = [0, 1];

const createCross = (cx: number, cy: number, color: string) => {
  const g = createSVGElement('g');

  linesCoefficients.forEach(coefficient => {
    const line = createSVGElement('line');
    line.setAttribute('stroke', color);
    line.setAttribute('fill', color);
    line.setAttribute('x1', `${cx - RADIUS + coefficient * DIAMETER}`);
    line.setAttribute('y1', `${cy - RADIUS}`);
    line.setAttribute('x2', `${cx + RADIUS - coefficient * DIAMETER}`);
    line.setAttribute('y2', `${cy + RADIUS}`);
    g.appendChild(line);
  });

  return g;
};

export default createCross;
