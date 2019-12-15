import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Select from './utilsComponents/Select';
import { getFiltered } from '../actions/study';

class SearchForm extends Component {
	state = {
		studyName: '',
		studyType: '',
		studySemester: '',
		studyUni: '',
		studyCity: '',
		application: '',
		studyTuition: '',
		isVisible: false
	};

	//Handle form display for small devices

	toggleForm = () => {
		this.setState({ isVisible: !this.state.isVisible });
	};

	//Handle input change
	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => this.props.getFiltered(this.props.allStudies, this.state));
	};

	// Get Initial Field Data and Remove Duplicates
	getFormItem = (lists, options) => {
		return [ ...new Set(lists.map((list) => list[options])) ];
	};

	render() {
		const formVisible = this.state.isVisible ? 'form-visible' : '';
		const { studyName, studyType, studySemester, studyUni, studyCity, application, studyTuition } = this.state;
		const allStudies = this.props.allStudies;
		// Get Initial Form Data
		const nameOptions = this.getFormItem(allStudies, 'studyName');
		const typeOptions = this.getFormItem(allStudies, 'studyType');
		const semesterOptions = this.getFormItem(allStudies, 'studySemester');
		const uniOptions = this.getFormItem(allStudies, 'studyUni');
		const cityOptions = this.getFormItem(allStudies, 'studyCity');
		const applicationOptions = this.getFormItem(allStudies, 'application');
		const tuitionOptions = this.getFormItem(allStudies, 'studyTuition');

		return (
			<Fragment>
				<div onClick={this.toggleForm} className='show-form'>
					<p>{this.state.isVisible ? 'Hide Form' : 'Click to Search'}</p>
				</div>
				<form className={`search-form ${formVisible}`}>
					<h3>Study Name</h3>
					<Select name='studyName' value={studyName} options={nameOptions} onChange={this.handleChange} />
					<h3>Study Type</h3>
					<Select name='studyType' value={studyType} options={typeOptions} onChange={this.handleChange} />
					<h3>Semester</h3>
					<Select
						name='studySemester'
						value={studySemester}
						options={semesterOptions}
						onChange={this.handleChange}
					/>
					<h3>University</h3>
					<Select name='studyUni' value={studyUni} options={uniOptions} onChange={this.handleChange} />
					<h3>City</h3>
					<Select name='studyCity' value={studyCity} options={cityOptions} onChange={this.handleChange} />
					<h3>Application</h3>
					<Select
						name='application'
						value={application}
						options={applicationOptions}
						onChange={this.handleChange}
					/>
					<h3>Tuition</h3>
					<Select
						name='studyTuition'
						value={studyTuition}
						options={tuitionOptions}
						onChange={this.handleChange}
					/>
					{/* <Button type={'submit'} text={'Search'} /> */}
				</form>
			</Fragment>
		);
	}
}

SearchForm.propTypes = {
	allStudies: PropTypes.array.isRequired,
	getFiltered: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	allStudies: state.study.allStudies
	// filtered: state.study.filtered
});

export default connect(mapStateToProps, { getFiltered })(SearchForm);
