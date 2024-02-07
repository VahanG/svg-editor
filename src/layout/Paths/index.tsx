import svgFromPath from '../../utils/svgFromPath';

import classes from './styles.module.scss';

interface IProps {
  paths: paper.Path[];
  setPath: (idx: number) => void;
  selected?: number;
}

const Paths = ({ paths, setPath, selected }: IProps) => {
  return (
    <div className={classes.paths}>
      {paths.map((path, idx) => {
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div className={`${classes.path} ${selected === path.id ? classes.selected : ''}`} onClick={() => setPath(idx)} key={path.id}>
            <svg width={40}>
              <path d={svgFromPath(path, 80)} />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default Paths;
