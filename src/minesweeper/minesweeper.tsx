import { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react';
import { Field } from './field';
import { GameManager, GameMatrix } from './game-manager';
import { Input } from './input';
import { MinesweeperContext } from './context'

import './minesweeper.css';

export function Minesweeper() {
	const [width, setWidth] = useState(10);
	const [height, setHeight] = useState(10);
	const [bombsCount, setBombsCount] = useState(15);
	const [gameOver, setGameOver] = useState(false);
	const [gameCount, setGameCount] = useState(0);
	const onGameOver = useCallback(() => setGameOver(true), []);
	const onUpdate = useCallback((newMatrix: GameMatrix) => setMatrix(newMatrix), []);
	const onNewGame = useCallback(
		() => {
			setGameCount((prev: number) => prev + 1);
			setGameOver(false);
		},
		[]
	);

	const gameManager = useRef(new GameManager({ width, height, bombsCount, onUpdate, onGameOver }));
	const [matrix, setMatrix] = useState<GameMatrix>([]);

	useEffect(
		() => {
			const newMatrix = gameManager.current.createNewGame();
			setMatrix(newMatrix);
		},
		[]
	);

	useEffect(
		() => {
			gameManager.current = new GameManager({ width, height, bombsCount, onUpdate, onGameOver });
			gameManager.current.createNewGame();
			const newMatrix = gameManager.current.createNewGame();
			setMatrix(newMatrix);
		},
		[width, height, bombsCount, gameCount]
	);

	return (
		<MinesweeperContext.Provider value={ { manager: gameManager.current } }>
			<div className="minesweeper">
				<div className="controlsContainer">
					<Input
						name={ 'width' }
						value={ width }
						onChange={ (e: ChangeEvent<HTMLInputElement>) => setWidth(Number(e.target.value)) }
						type={ 'number' }
					/>
					<Input
						name={ 'height' }
						value={ height }
						onChange={ (e: ChangeEvent<HTMLInputElement>) => setHeight(Number(e.target.value)) }
						type={ 'number' }
					/>
					<Input
						name={ 'bombs count' }
						value={ bombsCount }
						onChange={ (e: ChangeEvent<HTMLInputElement>) => setBombsCount(Number(e.target.value)) }
						type={ 'number' }
					/>
					<button onClick={ onNewGame }>New game</button>
				</div>

				<Field
					width={ width }
					matrix={ matrix }
					isGameOver={ gameOver }
				/>
			</div>
		</MinesweeperContext.Provider>
	);
}
