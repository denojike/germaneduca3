import React from 'react';

const NotFound = () => {
	const notfound = { display: 'flex', height: '40vh', justifyContent: 'center', alignItems: 'center' };
	return (
		<div className='container' style={notfound}>
			<h2>This resource does not exist!</h2>
		</div>
	);
};

export default NotFound;
