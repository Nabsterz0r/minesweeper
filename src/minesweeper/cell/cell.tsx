import { useContext } from 'react';
import { MinesweeperContext } from '../context';
import { ICell } from '../game-manager';

import './cell.css';

interface CellProps extends ICell {}

export function Cell(props: CellProps): JSX.Element {
	const { manager } = useContext(MinesweeperContext);
	const { x, y, isOpen, bombsNearby, detonated } = props;

	return (
		<button className={ createClassName(detonated, isOpen, bombsNearby) } onClick={ onClick }>
			{ bombsNearby ? bombsNearby : '' }
		</button>
	);

	function onClick(): void {
		if (!manager) {
			return;
		}

		manager.openCell(x, y);
	}
}

function createClassName(isDetonated?: boolean, isOpen?: boolean, bombsNearly?: number): string {
	let str = 'cell';

	if (isDetonated) {
		str += ' isDetonated';
	}

	if (isOpen) {
		str += ' isOpen';
	}
	return str;
}
