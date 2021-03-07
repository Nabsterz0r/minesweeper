import { createContext } from 'react';
import { GameManager } from '../game-manager';

interface MinesweeperContextProps {
	manager?: GameManager;
}

export const MinesweeperContext = createContext<MinesweeperContextProps>({});
