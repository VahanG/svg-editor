import { Point } from 'paper';

export default function svgFromPath(element: paper.Path, maxBound?: number) {
  const clone = element.clone();
  clone.bounds.topLeft = new Point([0, 0]);
  clone.closed = true;
  if (maxBound) {
    const { width, height } = clone.bounds;
    const max = Math.max(width, height);
    const wc = max / width;
    const hc = max / height;
    clone.bounds.width = maxBound / wc;
    clone.bounds.height = maxBound / hc;
    clone.bounds.x = (maxBound - clone.bounds.width) / 2;
    clone.bounds.y = (maxBound - clone.bounds.height) / 2;
  }

  const svgString = clone.pathData;
  clone.remove();
  return svgString;
}
