const createSimplePath = (data?: string) => {
  const path = data ? new paper.Path(data) : new paper.Path(); // type issue when passing undefined to Path()
  path.strokeColor = new paper.Color('black');
  path.fullySelected = true;
  path.fillColor = new paper.Color('rgba(255, 128, 0, 0.1)');
  return path;
};

export default createSimplePath;
