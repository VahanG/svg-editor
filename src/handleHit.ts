/* eslint-disable no-param-reassign */
import Paper, { Point } from 'paper';

import setupGuidelines from './tooling/guidelines-1';

type HitResult = paper.HitResult;

const getPointToCheck = (paths: paper.Path[], hitResult: HitResult) => {
  const segments = paths.reduce<paper.Segment[]>((acc, path) => {
    return [...acc, ...path.segments];
  }, []);
  const hitItem = hitResult.segment;
  return segments.filter(segment => segment.path !== hitItem.path || segment.index !== hitItem.index).map(segment => ({ x: segment.point.x, y: segment.point.y }));
};

const handleHit = (event: paper.MouseEvent, hitResult: HitResult, path: paper.Path, guidelines: ReturnType<typeof setupGuidelines>, paths: paper.Path[]) => {
  // @ts-ignore
  const nativeEvent = event.event as MouseEvent;
  if (nativeEvent.shiftKey) {
    if (hitResult.type === 'segment') {
      hitResult.segment.remove();
    }
    return;
  }

  if (hitResult.type === 'segment') {
    guidelines.onChangePoints(getPointToCheck(paths, hitResult));

    Paper.view.onMouseDrag = (ev: paper.MouseEvent) => {
      const { segment } = hitResult;
      const { x, y } = ev.point;
      const t = guidelines.checkAndDraw([{ x: 0, y: 0 }], { x, y }, 2);
      const diffX = (t.x || x) - x;
      const diffY = (t.y || y) - y;

      const newX = x + diffX;
      const newY = y + diffY;

      if (segment.hasHandles()) {
        const sumDiffX = newX - segment.point.x;
        const sumDiffY = newY - segment.point.y;
        segment.handleIn = new Point(hitResult.segment.handleIn.x - sumDiffX, hitResult.segment.handleIn.y - sumDiffY);
        segment.handleOut = new Point(hitResult.segment.handleOut.x - sumDiffX, hitResult.segment.handleOut.y - sumDiffY);
      }
      segment.point = new Point(newX, newY);
    };
  } else if (hitResult.type === 'handle-in') {
    Paper.view.onMouseDrag = (ev: paper.MouseEvent) => {
      hitResult.segment.handleIn = new Point(hitResult.segment.handleIn.x + ev.delta.x, hitResult.segment.handleIn.y + ev.delta.y);
    };
  } else if (hitResult.type === 'handle-out') {
    Paper.view.onMouseDrag = (ev: paper.MouseEvent) => {
      hitResult.segment.handleOut = new Point(hitResult.segment.handleOut.x + ev.delta.x, hitResult.segment.handleOut.y + ev.delta.y);
    };
  } else if (hitResult.type === 'fill') {
    Paper.view.onMouseDrag = (ev: paper.MouseEvent) => {
      hitResult.item.position = new Point(hitResult.item.position.x + ev.delta.x, hitResult.item.position.y + ev.delta.y);
    };
  } else if (hitResult.type === 'stroke') {
    const { location } = hitResult;
    path.insert(location.index + 1, event.point);
  }
};

export default handleHit;
