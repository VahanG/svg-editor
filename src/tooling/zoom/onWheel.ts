import { Point } from 'paper';

export default function onWheel(event: WheelEvent, view: paper.View) {
  let newZoom = view.zoom;
  const oldZoom = view.zoom;

  console.log(view.zoom);
  if (event.deltaY > 0) {
    newZoom = view.zoom * 1.05;
  } else {
    newZoom = view.zoom * 0.95;
  }

  const beta = oldZoom / newZoom;

  const mousePosition = new Point(event.offsetX, event.offsetY);

  // viewToProject: gives the coordinates in the Project space from the Screen Coordinates
  const mpos = view.viewToProject(mousePosition);
  const ctr = view.center;

  const pc = mpos.subtract(ctr);
  const offset = mpos.subtract(pc.multiply(beta)).subtract(ctr);

  // eslint-disable-next-line no-param-reassign
  view.zoom = newZoom;
  // eslint-disable-next-line no-param-reassign
  view.center = view.center.add(offset);

  event.preventDefault();
  view.update();
}
