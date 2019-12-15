import React from 'react';

const Select = ({ name, value, options, onChange }) => {
	return (
		<div className='form-group'>
			<select
				name={name}
				value={value}
				onChange={onChange}
				className='form-control'
				style={{ textAlign: 'center', textAlignLast: 'center' }}
			>
				<option />
				{options.map((optionItem, index) => <option key={index}>{optionItem}</option>)}
			</select>
		</div>
	);
};

export default Select;
