const COUNT = 1600;
const array = new Array(COUNT).fill(1);
import './grid.css';

const Grid = () => {
  return (
    <div className="grid">
      {array.map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={idx} className="dot" />
      ))}
    </div>
  );
};

export default Grid;
