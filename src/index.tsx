import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Minesweeper } from './minesweeper';

ReactDOM.render(
	<React.StrictMode>
		<Minesweeper />
	</React.StrictMode>,
	document.getElementById('minesweeper')
);
