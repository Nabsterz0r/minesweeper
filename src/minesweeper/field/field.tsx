import { useRef, useEffect, useState, useCallback } from 'react';
import { Cell } from '../cell';
import { GameManager, ICell, GameMatrix } from '../game-manager';
import { MinesweeperContext } from '../context'

import './field.css';

interface FieldProps {
	width: number;
	matrix: GameMatrix;
	isGameOver: boolean;
}

export function Field(props: FieldProps) {
	const { width, matrix, isGameOver } = props;

	return (
		<div className="field" style={ { gridTemplateColumns: `repeat(${width}, 20px)` } }>
			{ matrix.map((cell: ICell, idx: number) => {
				return <Cell { ...cell } key={ idx }/>;
			}) }
			{ isGameOver &&
				<div className="gameOver">
					<p>Game Over</p>
				</div>
			}
		</div>
	);
}