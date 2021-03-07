import React from "react";

import './input.css';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
}

export function Input(props: InputProps): JSX.Element {
	const { value, onChange, name, ...rest } = props;

	return (
		<div className="inputContainer">
			<label htmlFor={ name }>{ name }</label>
			<input
				className="input"
				name={ name }
				value={ value }
				onChange={ onChange }
				{ ...rest }
			/>
		</div>
	);
}