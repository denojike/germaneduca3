import axios from 'axios';
import { filterMany } from '../utils/myUtil';
import { toast } from 'react-toastify';
import {
	// SEARCH_STUDY,
	GET_SINGLE_STUDY,
	GET_ALL_STUDIES,
	GET_FILTERED,
	ADD_STUDY,
	UPDATE_STUDY,
	DELETE_STUDY,
	DELETE_ERROR
} from './types';

//ADD STUDY - for Admins only
export const addStudy = ({
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
	visitWebsite,
	gre,
	other,
	courseImage,
	courseDesc
}) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({
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
		courseDesc
		// courseImage
	});

	if (id) {
		try {
			const res = await axios.put(`/api/updateStudy/${id}`, body, config);

			dispatch({
				type: UPDATE_STUDY,
				payload: res.data
			});

			toast.success('Course successfully Updated');

			setTimeout(() => {
				window.location = `/courses/${id}`;
			}, 2000);
		} catch (err) {
			console.log(err.response);
		}
	} else {
		try {
			const res = await axios.post('/api/study', body, config);

			dispatch({
				type: ADD_STUDY,
				payload: res.data
			});

			toast.success('Course successfully Added');
			setTimeout(() => {
				window.location = `/`;
			}, 2000);
		} catch (err) {
			console.log(err.response);
			// const error = err.response.data.errors[0].msg;
			// if (error === "Study already exists") {
			//   toast(error);
			// }
		}
	}
};

//UPDATE STUDY - for Admins only
export const updateStudy = ({
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
}) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({
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
		courseDesc
		// courseImage
	});

	try {
		const res = await axios.put(`/api/updateStudy/${id}`, body, config);

		dispatch({
			type: UPDATE_STUDY,
			payload: res.data
		});
		toast.success('Course successfully Updated');

		setTimeout(() => {
			window.location = `/study/${id}`;
		}, 2000);
	} catch (err) {
		console.log(err.response);
		const error = err.response.data.msg;
		if (error === 'Study already exists') {
			toast(error);
		}
	}
};

// GET SINGLE STUDY
export const getSingleStudy = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/searchStudy/${id}`);

		dispatch({
			type: GET_SINGLE_STUDY,
			payload: res.data
		});
	} catch (err) {
		console.log(err.response);
		dispatch({
			type: GET_SINGLE_STUDY,
			payload: { msg: 'Invalid Course ID' }
		});
	}
};

// GET ALL STUDIES
export const getAllStudies = () => async (dispatch) => {
	try {
		const res = await axios.get(`/api/getAllStudies`);

		dispatch({
			type: GET_ALL_STUDIES,
			payload: res.data
		});
	} catch (err) {
		if (err) {
			console.log(err.response);
		}
	}
};

// GET FILTERED STUDIES
export const getFiltered = (array, obj) => (dispatch) => {
	dispatch({
		type: GET_FILTERED,
		payload: filterMany(array, obj)
	});
};

// Delete STUDY
export const deleteStudyByID = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/deleteStudy/${id}`);

		dispatch({
			type: DELETE_STUDY,
			payload: id
		});
		toast.success('Course succesfully Delete');
	} catch (err) {
		dispatch({
			type: DELETE_ERROR,
			payload: { msg: err.response }
		});
	}
};
