import { IComparablePoint, Vector2d } from '../../types';

import { DIRECTIONS } from '../../constants';

const findMatchPoints = (pointsToCheck: IComparablePoint[], point: IComparablePoint, initialCoords: Vector2d, offset: number) => {
  let xOffset = offset;
  let yOffset = offset;
  return pointsToCheck.reduce((matches: { point: IComparablePoint; direction: DIRECTIONS }[], pointToCheck) => {
    const diffX = Math.abs(pointToCheck.x - (point.x + initialCoords.x));
    if (diffX <= xOffset) {
      if (diffX < xOffset) {
        // eslint-disable-next-line no-param-reassign
        matches = matches.filter(({ direction }) => direction !== DIRECTIONS.horizontal);
      }
      // do not add with bigger offset than already added
      xOffset = diffX;
      matches.push({
        point: pointToCheck,
        direction: DIRECTIONS.horizontal,
      });
    }

    const diffY = Math.abs(pointToCheck.y - (point.y + initialCoords.y));
    if (diffY <= yOffset) {
      if (diffY < yOffset) {
        // eslint-disable-next-line no-param-reassign
        matches = matches.filter(({ direction }) => direction !== DIRECTIONS.vertical);
      }
      yOffset = diffY;
      matches.push({
        point: pointToCheck,
        direction: DIRECTIONS.vertical,
      });
    }
    return matches;
  }, []);
};

export default findMatchPoints;
