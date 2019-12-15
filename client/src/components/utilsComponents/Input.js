import React from 'react';

const Input = ({ type, name, value, label, onChange }) => {
	return (
		<div className='my-input'>
			<input type={type} name={name} value={value} placeholder={label} onChange={onChange} />
		</div>
	);
};

export default Input;
