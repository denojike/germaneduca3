import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import course1 from '../img/courses/course1.jpeg';
// import course3 from '../img/courses/course3.jpg';
import course2 from '../img/courses/course2.jpeg';
import SearchForm from '../components/SearchForm';
import UpdateBar from '../components/UpdateBar';
import Error from '../components/Error';
import Paginate from '../components/utilsComponents/Paginate';
import { paginate } from '../utils/paginate';

const Courses = ({ filtered, loaded }) => {
	const studyLength = filtered.length;

	//setImageUrl
	const setImageUrl = (index) => {
		let imageUrl;
		if (Math.floor(index % 2) === 0) {
			imageUrl = course1;
		} else {
			imageUrl = course2;
		}
		return imageUrl;
	};

	//Handle Page change
	const [ currentPage, setCurrentPage ] = useState(1);
	const pageSize = 4;
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	//paginate courses
	const pagedStudies = paginate(filtered, currentPage, pageSize);

	if (studyLength === 0 && !loaded) return <Error msg={'Fetching courses ....'} />;
	if (studyLength === 0 && loaded)
		return (
			<div className='container'>
				<UpdateBar studyLength={studyLength} />
				<div className='courses-layout'>
					<Error msg='No course found. Please refresh your search' />

					<SearchForm />
				</div>
			</div>
		);

	return (
		<div className='container'>
			<UpdateBar studyLength={studyLength} />
			<div className='courses-layout'>
				<div className='courses'>
					{pagedStudies.map((study, i) => (
						<div className='course shadow' key={study._id}>
							<div className='course-image'>
								<div className='image-overlay'>
									<Link to={`/courses/${study._id}`}>Visit Course</Link>
								</div>
								<img src={setImageUrl(i)} alt='' />
							</div>
							<div className='course-desc'>
								<p className='course-desc-type'>{study.studyType}</p>
								<h2 className='course-desc-name'> {study.studyName}</h2>
								<p className='course-desc-text'>
									{(study.courseDesc && study.courseDesc.slice(0, 200)) ||
										' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio dolore saepe obcaecati, sit voluptates corrupti animi ullam fugit sed fugiat incidunt eaque nemo nisi provident placeat error totam quos laudantium eos cupiditate nam facere minus ad. Praesentium natus omnis recusandae est similique a. Ipsam cumque harum non fugiat rerum earum ut tenetur porro, id dolorem adipisci vero, quae at architecto illum rem ratione. Libero iure odio animi debitis alias harum?'.slice(
											0,
											200
										)}
								</p>
							</div>
							<div className='course-footer'>
								<span>
									<FaMapMarkedAlt /> {study.studyCity}
								</span>
								<span>
									<IoMdTime /> {study.studySemester}
								</span>
							</div>
						</div>
					))}
				</div>
				<Paginate
					studyLength={studyLength}
					pageSize={pageSize}
					onPageChange={handlePageChange}
					currentPage={currentPage}
				/>
				<SearchForm />
			</div>
		</div>
	);
};

Courses.propTypes = {
	loaded: PropTypes.bool.isRequired,
	isAuthenticated: PropTypes.bool,
	filtered: PropTypes.array.isRequired
	// deleteStudyByID: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	loaded: state.study.loaded,
	filtered: state.study.filtered
	// isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Courses);
