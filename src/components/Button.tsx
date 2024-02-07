import React, { FC, ReactNode } from 'react';

interface ButtonProps {
	onClick: () => void;
	children: ReactNode
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
	return (
			<button onClick={onClick}>
				{children}
			</button>
	);
};

export default Button;
