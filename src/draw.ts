import Paper from 'paper';
import createSimplePath from './createSimplePath';

const draw = (currentPath: paper.Path, tolerance?: number) => {
  const path = createSimplePath();
  Paper.view.onMouseDrag = (event: paper.MouseEvent) => {
    path.add(event.point);
  };
  const oldEvent = Paper.view.onMouseUp;
  Paper.view.onMouseUp = () => {
    Paper.view.onMouseUp = oldEvent;
    if (tolerance) {
      path.simplify(tolerance);
    }
    path.segments.forEach(s => (s.selected = true));
    currentPath.add(...path.segments);
    path.remove();
  };
};

export default draw;
