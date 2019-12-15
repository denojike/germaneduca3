import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FaSchool, FaCity, FaClock, FaPen } from 'react-icons/fa';
import { MdMoneyOff } from 'react-icons/md';
import course1 from '../img/courses/course1.jpeg';
import Button from '../components/utilsComponents/Button';
import Error from '../components/Error';
import { getSingleStudy, deleteStudyByID } from '../actions/study';

const SingleCourse = ({ match, getSingleStudy, deleteStudyByID, singleStudy, single, isAuthenticated }) => {
	const { id } = match.params;

	useEffect(
		() => {
			getSingleStudy(id);
		},
		[ getSingleStudy, id ]
	);

	//handle delete function
	const handleDelete = (id) => {
		deleteStudyByID(id);
		setTimeout(() => {
			window.location = '/';
		}, 500);
	};
	const {
		_id,
		studyName,
		studyType,
		studyUni,
		studySemester,
		studyCity,
		application,
		studyTuition,
		studyDeadline,
		website,
		previousEnglish,
		previousForUS,
		englishAll,
		englishLetter,
		gre,
		other,
		courseDesc
	} = singleStudy;

	if (single && singleStudy.msg === 'Invalid Course ID') return <Error msg={'Course not found'} />;
	if (!single) return <Error msg={'Fetching course'} />;

	return (
		<div className='container'>
			<div className='single-course'>
				<div className='course-top'>
					<div className='course-top-img'>
						<img src={course1} alt={'Course one'} />
					</div>
					<div className='course-top-features'>
						<h2> </h2>
						<div className='line' />
						<div className='course-top-features-item'>
							<div>
								<FaSchool /> <span>School</span>
							</div>
							<div> {studyUni}</div>
						</div>
						<div className='course-top-features-item'>
							<div>
								<FaCity /> <span>City</span>
							</div>
							<div>{studyCity}</div>
						</div>
						<div className='course-top-features-item'>
							<div>
								<FaClock /> <span>Period</span>
							</div>
							<div>{studySemester}</div>
						</div>
						<div className='course-top-features-item'>
							<div>
								<MdMoneyOff /> <span>Tuition</span>
							</div>
							<div>{studyTuition}</div>
						</div>
						<div className='course-top-features-item'>
							<div>
								<FaPen /> <span>Deadline</span>
							</div>
							<div>{studyDeadline}</div>
						</div>
						<div className='course-top-features-item'>
							<div>
								<FaPen /> <span>Application</span>
							</div>
							<div>{application}</div>
						</div>
					</div>
				</div>
				<div className='course-middle'>
					<div className='course-middle-desc'>
						<h2>{`${studyType} in ${studyName}`}</h2>
						<p> {courseDesc}</p>
					</div>
					<div className='course-middle-special'>
						<h2>Special Requirements</h2>
						<ul>
							{previousEnglish && <li>{previousEnglish}</li>}
							{previousForUS && <li>{previousForUS}</li>}
							{englishAll && <li>{englishAll}</li>}
							{englishLetter && <li>{englishLetter}</li>}
							{gre && <li>{gre}</li>}
							{other && <li>{other}</li>}
						</ul>
					</div>
				</div>
				<div className='course-bottom'>
					<a href={website} target='_blank' rel='noopener noreferrer'>
						<Button text={'Visit Website'} />
					</a>
					{isAuthenticated && (
						<Fragment>
							<Link to={`/add-course/${_id}`}>
								<Button text={'Edit Course'} color={{ color: '#666666', background: '#eddc49' }} />
							</Link>
							<Button
								text={'Delete Course'}
								color={{ color: '#f1f1f1', background: '#dc3545' }}
								onClick={() => handleDelete(_id)}
							/>
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

SingleCourse.propTypes = {
	getSingleStudy: PropTypes.func.isRequired,
	deleteStudyByID: PropTypes.func.isRequired,
	singleStudy: PropTypes.object.isRequired,
	single: PropTypes.bool,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	singleStudy: state.study.singleStudy,
	single: state.study.single,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getSingleStudy, deleteStudyByID })(SingleCourse);
