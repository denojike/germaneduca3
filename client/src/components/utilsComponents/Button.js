import React from 'react';

const Button = ({ type, text, onClick, color }) => {
	return (
		<div className='my-button'>
			<button type={type} onClick={onClick} style={color}>
				{text}
			</button>
		</div>
	);
};

export default Button;
