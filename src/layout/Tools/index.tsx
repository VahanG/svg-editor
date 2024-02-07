import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import ShareButton from '../../components/ShareButton';

import { Modes } from '../../constants';
import Info from '../../Info';

import classes from './styles.module.scss';
import History from './history';

interface IProps {
	apply: () => void;
	clear: () => void;
	close: () => void;
	createPathString: () => void;
	addPath: () => void;
	setMode: (mode: Modes) => void;
	mode: Modes;
	showGrid: boolean;
	setShowGrid: (show: boolean) => void;
	undo: () => void;
	redo: () => void;
}

const Tools = ({
	               apply,
	               clear,
	               close,
	               createPathString,
	               addPath,
	               mode,
	               setMode,
	               setShowGrid,
	               showGrid,
	               undo,
	               redo
               }: IProps) => {
	const isDrawMode = mode === Modes.draw;
	return (
			<div className={classes.tools}>
				<Info />
				<Button onClick={clear}>clear</Button>
				<Button onClick={close}>close miniapp</Button>
				<ShareButton createPathString={createPathString} />
				<Button onClick={addPath}>Add path</Button>

				<Checkbox onChange={() => setMode(isDrawMode ? Modes.pen : Modes.draw)} isChecked={isDrawMode}
				          label="Draw mode" />
				<Checkbox onChange={() => setShowGrid(!showGrid)} isChecked={showGrid} label="Show grid" />
				<History undo={undo} redo={redo} />
				<Button onClick={apply}>Apply</Button>
			</div>
	);
};

export default Tools;
