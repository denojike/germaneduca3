import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { addStudy } from '../../actions/study';
import { toast } from 'react-toastify';
import germanData from '../../utils/german-cities';
import Button from '../../components/utilsComponents/Button';

const AddCourse = ({ addStudy, match }) => {
	const { id } = match.params;

	const [ errors, setErrors ] = useState({});

	const [ formData, setFormData ] = useState({
		studyName: '',
		studyType: '',
		studySemester: '',
		studyUni: '',
		studyCity: '',
		studyState: '',
		studyTuition: '',
		studyDeadline: '',
		application: '',
		website: '',
		previousEnglish: '',
		previousForUS: '',
		englishAll: '',
		englishLetter: '',
		gre: '',
		visitWebsite: '',
		other: '',
		courseImage: '',
		courseDesc: ''
	});

	useEffect(
		() => {
			id &&
				axios
					.get(`/api/searchStudy/${id}`)
					.then((res) => {
						const singleStudy = res.data;
						setFormData({
							studyName: singleStudy.studyName,
							studyType: singleStudy.studyType,
							studySemester: singleStudy.studySemester,
							studyUni: singleStudy.studyUni,
							studyCity: singleStudy.studyCity,
							studyState: singleStudy.studyState,
							studyTuition: singleStudy.studyTuition,
							studyDeadline: singleStudy.studyDeadline,
							application: singleStudy.application,
							website: singleStudy.website,
							previousEnglish: singleStudy.previousEnglish,
							previousForUS: singleStudy.previousForUS,
							englishAll: singleStudy.englishAll,
							englishLetter: singleStudy.englishLetter,
							gre: singleStudy.gre,
							visitWebsite: singleStudy.visitWebsite,
							other: singleStudy.other,
							courseDesc: singleStudy.courseDesc
						});
					})
					.catch((err) => console.log(err));
		},
		[ id ]
	);

	const {
		studyName,
		studyType,
		studySemester,
		studyUni,
		studyCity,
		studyState,
		studyTuition,
		studyDeadline,
		application,
		website,
		previousEnglish,
		previousForUS,
		englishAll,
		englishLetter,
		gre,
		visitWebsite,
		other,
		courseImage,
		courseDesc
	} = formData;

	//check Required Fields and Optional Fields
	const validateFields = () => {
		const errors = {};
		if (!studyName) {
			errors.nameErr = 'Study Name is required';
		}
		if (!studyType) {
			errors.typeErr = 'Study Type is required';
		}
		if (!studySemester) {
			errors.semesterErr = 'Semester is required';
		}
		if (!studyUni) {
			errors.uniErr = 'University is required';
		}
		if (!studyCity) {
			errors.cityErr = 'City is required';
		}
		if (!studyTuition) {
			errors.tuitionErr = 'Tuition is required';
		}
		if (!studyDeadline) {
			errors.deadlineErr = 'Deadline is required';
		}
		if (!application) {
			errors.applicationErr = 'Where to apply is required';
		}
		if (!website) {
			errors.websiteErr = 'Website is required';
		}
		if (!previousEnglish && !previousForUS && !englishAll && !englishLetter && !gre && !visitWebsite) {
			errors.specialErr = 'You must fill one field from Special Requirements';
		}
		if (!courseDesc) {
			errors.courseDesc = 'Description is required';
		}
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	// Check for edit
	const checkForEdit = (editText, newText) => {
		return id ? editText : newText;
	};

	const onUpload = (e) => {
		if (e.target.files && e.target.files[0]) {
			let file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				setFormData({
					...formData,
					courseImage: e.target.result
				});
			};
			reader.readAsDataURL(file);
		}
	};

	const onChange = (e) => {
		let { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
			studyState: studyCity && germanData.data.filter((city) => city.name === studyCity)[0].state
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (!validateFields()) {
			toast.error('You did not fill out all the required fields');
		} else {
			addStudy({
				id,
				studyName,
				studyType,
				studySemester,
				studyUni,
				studyCity,
				studyState,
				studyTuition,
				studyDeadline,
				application,
				website,
				previousEnglish,
				previousForUS,
				englishAll,
				englishLetter,
				gre,
				visitWebsite,
				other,
				courseImage,
				courseDesc
			});
		}
	};

	return (
		<div className='container'>
			<div className='add-course'>
				<form onSubmit={(e) => onSubmit(e)} encType='multipart/form-data'>
					<div className='form-row'>
						<h2>{checkForEdit('Update Course', 'Add New Course')}</h2>
					</div>

					<div className='line' />

					<div className='form-row'>
						<h3>Study Name</h3>
						{errors.nameErr && <p className=' text-danger'>{errors.nameErr}</p>}
						<input
							type='text'
							name='studyName'
							onChange={(e) => onChange(e)}
							value={studyName}
							className='form-control '
						/>
					</div>
					<div className='form-row'>
						<h3>Study Type</h3>
						{errors.typeErr && <p className=' text-danger'>{errors.typeErr}</p>}
						<select
							name='studyType'
							onChange={(e) => onChange(e)}
							value={studyType}
							className='form-control '
						>
							<option />
							<option>BA</option>
							<option>Bsc</option>
							<option>BEng</option>
							<option>MEng</option>
							<option>Diploma</option>
							<option>MA</option>
							<option>Msc</option>
							<option>MBA</option>
							<option>Phd</option>
						</select>
					</div>
					<div className='form-row'>
						<h3>Study Semester</h3>
						{errors.semesterErr && <p className=' text-danger'>{errors.semesterErr}</p>}
						<select
							name='studySemester'
							onChange={(e) => onChange(e)}
							value={studySemester}
							className='form-control '
						>
							<option />
							<option>Winter</option>
							<option>Summer</option>
							<option>Winter/Summer</option>
						</select>
					</div>

					<div className='row'>
						<div className='form-row'>
							<h3>University</h3>
							{errors.uniErr && <p className=' text-danger'>{errors.uniErr}</p>}
							<input
								type='text'
								name='studyUni'
								onChange={(e) => onChange(e)}
								value={studyUni}
								className='form-control '
							/>
						</div>
						<div className='form-row'>
							<h3>City</h3>
							{errors.cityErr && <p className=' text-danger'>{errors.cityErr}</p>}
							<select
								name='studyCity'
								onChange={(e) => onChange(e)}
								value={studyCity}
								className='form-control '
							>
								<option />
								{germanData.data.map((city) => <option key={city.name}> {city.name}</option>)}
							</select>
						</div>
						<div className='form-row'>
							<h3>State</h3>
							<select
								name='studyState'
								onChange={(e) => onChange(e)}
								value={studyState}
								className='form-control '
								disabled={true}
							>
								<option>
									{studyCity && germanData.data.filter((item) => item.name === studyCity)[0].state}
								</option>
							</select>
						</div>
					</div>

					<div className='form-row'>
						<h3>Application Dealine</h3>
						{errors.deadlineErr && <p className=' text-danger'>{errors.deadlineErr}</p>}
						<small />
						<input
							type='text'
							name='studyDeadline'
							onChange={(e) => onChange(e)}
							value={studyDeadline}
							className='form-control '
						/>
					</div>
					<div className='form-row'>
						<h3>Application</h3>
						{errors.applicationErr && <p className=' text-danger'>{errors.applicationErr}</p>}
						<select
							name='application'
							onChange={(e) => onChange(e)}
							value={application}
							className='form-control '
						>
							<option />
							<option>direct to school</option>
							<option>uni-assist</option>
							<option>Hochschulstat</option>
							<option>visit website</option>
						</select>
					</div>
					<div className='form-row'>
						<h3>Course Website</h3>
						{errors.websiteErr && <p className=' text-danger'>{errors.websiteErr}</p>}
						<input
							type='text'
							name='website'
							onChange={(e) => onChange(e)}
							value={website}
							className='form-control'
						/>
					</div>
					<div className='form-row'>
						<h3>Course Image</h3>
						{errors.courseImage && <p className=' text-danger'>{errors.courseImage}</p>}
						<input type='file' onChange={(e) => onUpload(e)} className='form-control' />
						<small style={{ marginLeft: '1rem' }}>
							Image is not persisted in the database. It can only be previewed
						</small>
					</div>
					{courseImage && (
						<div className='form-row'>
							<img src={courseImage} alt='preview' width='50%' />
						</div>
					)}
					<div className='form-row'>
						<h3>Description</h3>
						{errors.courseDesc && <p className=' text-danger'>{errors.courseDesc}</p>}
						<textarea
							name='courseDesc'
							value={courseDesc}
							className='form-control'
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='form-row'>
						<div className='special'>
							<div>
								<h2>Study Special Requirements</h2>

								<p>Please select only fields that are applicable</p>
								<div className='line' />
								{errors.specialErr && <p className=' text-danger'>{errors.specialErr}</p>}
							</div>
							<div>
								<select
									name='previousEnglish'
									onChange={(e) => onChange(e)}
									value={previousEnglish}
									className='form-control '
								>
									<option />
									<option>
										Toefl/IELTS is not required for those who previously studied in English
									</option>
								</select>
							</div>
							<div>
								<select
									name='previousForUS'
									onChange={(e) => onChange(e)}
									value={previousForUS}
									className='form-control '
								>
									<option />
									<option>
										Toefl/IELTS is not required only for North Americans, UK, Australia, South
										Africa
									</option>
								</select>
							</div>
							<div>
								<select
									name='englishAll'
									onChange={(e) => onChange(e)}
									value={englishAll}
									className='form-control '
								>
									<option />
									<option>Toefl/IELTS is required</option>
								</select>
							</div>
							<div>
								<select
									name='englishLetter'
									onChange={(e) => onChange(e)}
									value={englishLetter}
									className='form-control'
								>
									<option />
									<option>
										An English language confirmation letter from school suffices for Toefl/English
									</option>
								</select>
							</div>
							<div>
								<select name='gre' onChange={(e) => onChange(e)} value={gre} className='form-control '>
									<option />
									<option>GRE is required</option>
								</select>
							</div>
							<div>
								<select
									name='visitWebsite'
									onChange={(e) => onChange(e)}
									value={visitWebsite}
									className='form-control '
								>
									<option />
									<option>Visit Website</option>
								</select>
							</div>
						</div>
					</div>

					<div className='form-row'>
						<h3>Tuition</h3>
						{errors.tuitionErr && <p className=' text-danger'>{errors.tuitionErr}</p>}
						<select
							name='studyTuition'
							onChange={(e) => onChange(e)}
							value={studyTuition}
							className='form-control'
						>
							<option />
							<option>free</option>
							<option>paid</option>
							<option>visit website</option>
						</select>
					</div>
					<div className='form-row'>
						<h3>Other</h3>
						<input
							name='other'
							onChange={(e) => onChange(e)}
							value={other}
							className='form-control '
							placeholder='Enter other requirements separating them with comma'
						/>
					</div>

					<div className='form-row'>
						<Button text={checkForEdit('Update', 'Add Course')} />
					</div>
				</form>
			</div>
		</div>
	);
};

AddCourse.propTypes = {
	addStudy: PropTypes.func.isRequired
	// added: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
	// added: state.study.added
});

export default connect(mapStateToProps, { addStudy })(AddCourse);
