import createSVGElement from '../../utils/createSVGElement';
import { DIRECTIONS } from '../../constants';
import { IComparablePoint, Vector2d } from '../../types';

import createCross from './createCross';
import findMatchPoints from './findMatchPoints';

interface IGuidelineConfigs {
  color: string;
}
const zGuideLines = 10;

const setupGuidelines = (container: HTMLDivElement, configs: IGuidelineConfigs = { color: 'red' }) => {
  let pointsToCheck: IComparablePoint[] = [];
  const svg = createSVGElement('svg');
  svg.style.position = 'absolute';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = zGuideLines.toString();
  container.prepend(svg);

  const drawLine = (pointFrom: Vector2d, pointTo: IComparablePoint, direction: DIRECTIONS) => {
    const path = createSVGElement('path');

    svg.appendChild(path);
    if (pointTo.w && pointTo.h) {
      const cx = direction === DIRECTIONS.horizontal ? pointTo.x : pointTo.w;
      const cy = direction === DIRECTIONS.vertical ? pointTo.y : pointTo.h;
      svg.appendChild(createCross(cx, cy, configs.color));
    }
    svg.appendChild(createCross(pointTo.x, pointTo.y, configs.color));
    path.setAttribute('stroke', configs.color);
    path.setAttribute('stroke-width', '1px');
    path.setAttribute('d', `M${pointFrom.x}, ${pointFrom.y} L${pointTo.x}, ${pointTo.y}`);
  };

  const removeLines = () => {
    while (svg.firstChild) {
      svg.lastChild && svg.removeChild(svg.lastChild);
    }
  };
  const remove = () => {
    svg.style.display = 'none';
    removeLines();
  };

  const checkAndDraw = (points: IComparablePoint[], initialCoords: Vector2d, offset: number) => {
    removeLines();
    return points.reduce((result: Partial<Vector2d>, point) => {
      const drawFrom = {
        x: initialCoords.x + point.x,
        y: initialCoords.y + point.y,
      };
      const change: Partial<Vector2d> = {};
      const matchPoints = findMatchPoints(pointsToCheck, point, initialCoords, offset);
      matchPoints.forEach(({ direction, point: matchedPoint }) => {
        if (direction === DIRECTIONS.horizontal) {
          drawFrom.x = matchedPoint.x;
          change.x = matchedPoint.x - point.x;
        } else {
          drawFrom.y = matchedPoint.y;
          change.y = matchedPoint.y - point.y;
        }
        drawLine(drawFrom, matchedPoint, direction);
      });
      return {
        ...result,
        ...change,
      };
    }, {});
  };

  const onChangePoints = (points: IComparablePoint[]) => {
    svg.style.display = 'block';
    svg.setAttribute('width', `${container.scrollWidth * container.offsetWidth}px`);
    svg.setAttribute('height', `${container.scrollHeight * container.offsetHeight}px`);
    pointsToCheck = points;
  };

  return {
    checkAndDraw,
    onChangePoints,
    remove,
  };
};

export default setupGuidelines;
