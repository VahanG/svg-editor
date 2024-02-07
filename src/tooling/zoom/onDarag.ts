export default function onDrag(view: paper.View) {
  const tool = new paper.Tool();

  tool.onMouseDrag = function (event: paper.ToolEvent & { event: MouseEvent }) {
    const pan_offset = event.point.subtract(event.downPoint);
    console.log(view.center);
    // eslint-disable-next-line no-param-reassign
    view.center = view.center.subtract(pan_offset);
  };
  return () => {
    tool.remove();
  };
}
