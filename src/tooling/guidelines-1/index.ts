import { DIRECTIONS } from '../../constants';
import { IComparablePoint, Vector2d } from '../../types';

import findMatchPoints from './findMatchPoints';
import addPoint from '../../addPoint';

interface IGuidelineConfigs {
  color: string;
}

const setupGuidelines = (container: HTMLDivElement, configs: IGuidelineConfigs = { color: 'red' }) => {
  const paths: paper.Path[] = [];
  let pointsToCheck: IComparablePoint[] = [];

  const drawLine = (pointFrom: Vector2d, pointTo: IComparablePoint, direction: DIRECTIONS) => {
    const path = new paper.Path();
    paths.push(path);

    path.strokeColor = new paper.Color(configs.color);
    path.strokeWidth = 2;
    addPoint(path, new paper.Point(pointFrom));
    addPoint(path, new paper.Point(pointTo));

    if (pointTo.w && pointTo.h) {
      //credate croses
    }
  };

  const removeLines = () => {
    paths.forEach(path => path.remove());
  };
  const remove = () => {
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
    pointsToCheck = points;
  };

  return {
    checkAndDraw,
    onChangePoints,
    remove,
  };
};

export default setupGuidelines;
