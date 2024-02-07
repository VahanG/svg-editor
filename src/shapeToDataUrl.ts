import createSVGElement from './utils/createSVGElement';

const shapeToDataUrl = (path: string, { width, height }: { width: number; height: number }) => {
  const svg = createSVGElement('svg');
  svg.setAttribute('viewbox', `0 0 ${width} ${height}`);
  svg.innerHTML = path;
  const svgString = new XMLSerializer().serializeToString(svg);
  const base64 = btoa(unescape(encodeURIComponent(svgString)));
  return `data:image/svg+xml;base64,${base64}`;
};

export default shapeToDataUrl;
