import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ msg, errorClass }) => {
	return (
		<div className='error'>
			<div className='container'>
				<h2 className={errorClass}>{msg}</h2>
			</div>
		</div>
	);
};

Error.propTypes = {
	msg: PropTypes.string.isRequired,
	errorClass: PropTypes.string
};

export default Error;
