import React, {  FC } from 'react';

interface CheckboxProps {
	label: string;
	onChange: () => void;
	isChecked: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ label, onChange, isChecked }) => {


	return (
			<div>
				<label>
					<input
							type="checkbox"
							checked={isChecked}
							onChange={onChange}
					/>
					{label}
				</label>
			</div>
	);
};

export default Checkbox;
