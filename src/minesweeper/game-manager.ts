interface GameManagerOptions {
	width: number;
	height: number;
	bombsCount: number;
	onUpdate: (matrix: GameMatrix) => void;
	onGameOver: () => void;
}

interface CellOption {
	isBomb?: boolean;
	isOpen?: boolean;
	bombsNearby?: number;
	detonated?: boolean;
}

export interface ICell extends CellOption {
	x: number;
	y: number;
}

export type GameMatrix = ICell[];

export class GameManager {
	public gameMartix: GameMatrix = [];
	private _options: GameManagerOptions;

	constructor(options: GameManagerOptions) {
		this._options = options;
	}

	public createNewGame(): GameMatrix {
		const { width, height, bombsCount } = this._options;
		const bombsArr = createCellsArray(bombsCount, true)
		const cellsArrayLenght = (width * height) - bombsCount;
		const cellsArr = createCellsArray(cellsArrayLenght);

		const matrix = [...bombsArr, ...cellsArr].sort(() => Math.random() - 0.5); // sort array in random way to put bombs;

		this.gameMartix = [];
		matrix.forEach((cellOpt: CellOption, index: number) => {
			const y = index < width ? 0 : Math.floor(index / width);
			const x = index < width ? index : index % width;

			const cell = Object.assign({}, cellOpt, { x, y });
			this.gameMartix?.push(cell);
		});

		return this.gameMartix;
	}

	public openCell(x: number, y: number): void {
		const cell = this._getCell(x, y);

		if (!cell || cell.isOpen) {
			return;
		}

		if (cell.isBomb) {
			cell.detonated = true;
			return this._options.onGameOver();
		}

		if (!cell.isOpen) {
			if (cell.bombsNearby === undefined) {
				this._scanCell(cell);
			}

			cell.isOpen = true;

			this.gameMartix = [...this.gameMartix];
			this._options.onUpdate(this.gameMartix);
		}
	}

	private _scanCell(cell: ICell): void {
		const { x, y } = cell;
		let bombsCount = 0;

		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				const cell = this._getCell(i, j);

				if (cell && cell.isBomb) {
					bombsCount++;
				}
			}
		}

		cell.bombsNearby = bombsCount;

		if (bombsCount) {
			return this.openCell(x, y);
		}

		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				this.openCell(i, j);
			}
		}
	}

	private _getCell(x: number, y: number): ICell | undefined {
		const { width, height } = this._options;
		if (
			x < 0 ||
			y < 0 ||
			x >= width ||
			y >= height
		) {
			return;
		}

		return this.gameMartix[x + y * width];
	}
}

function createCellsArray(lenght: number, isBomb = false): CellOption[] {
	const arr: CellOption[] = [];

	for (let i = 0; i < lenght; i++) {
		arr.push({ isBomb: isBomb });
	}

	return arr;
}
