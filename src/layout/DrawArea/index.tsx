import { RefObject } from 'react';

import Grid from './Grid';

import classes from './style.module.scss';

interface IProps {
  showGrid: boolean;
  containerRef: RefObject<HTMLDivElement>;
}
const DrawArea = ({ showGrid, containerRef }: IProps) => {
  return (
    <div className={classes.area} ref={containerRef}>
      <canvas className={classes.canvas} id="drawingCanvas" />
      {showGrid && <Grid />}
    </div>
  );
};

export default DrawArea;
