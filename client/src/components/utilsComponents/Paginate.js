import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Paginate = ({ studyLength, pageSize, onPageChange, currentPage }) => {
	const pagesCount = Math.ceil(studyLength / pageSize);
	if (pagesCount === 1) return null;
	const pages = _.range(1, pagesCount + 1);

	return (
		<nav className='paginate'>
			<ul>
				{pages.map((page) => (
					<li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
						<button className='page-link' onClick={() => onPageChange(page)}>
							{page}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

Paginate.propTypes = {
	studyLength: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired
};

export default Paginate;
