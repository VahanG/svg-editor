import Button from '../../../components/Button';
interface IProps {
  undo: () => void;
  redo: () => void;
}
const History = ({ undo, redo }: IProps) => {
  return (
    <div>
      <Button onClick={undo}>{'<-undo'}</Button>
      <Button onClick={redo}>{'redo->'}</Button>
    </div>
  );
};

export default History;
