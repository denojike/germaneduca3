import {
	SEARCH_STUDY,
	GET_SINGLE_STUDY,
	GET_ALL_STUDIES,
	GET_FILTERED,
	ADD_STUDY,
	UPDATE_STUDY,
	DELETE_STUDY,
	DELETE_ERROR
} from '../actions/types';

const initialState = {
	studies: [],
	singleStudy: {},
	allStudies: [],
	filtered: [],
	updatedStudy: {},
	newStudy: {},
	single: false,
	loaded: false,
	added: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ADD_STUDY:
			return {
				...state,
				newStudy: payload,
				added: true
			};
		case UPDATE_STUDY:
			return {
				...state,
				updatedStudy: payload
				// updated: true
			};
		case SEARCH_STUDY:
			return {
				...state,
				studies: payload,
				loaded: false
			};

		case GET_SINGLE_STUDY:
			return {
				...state,
				singleStudy: payload,
				single: true
			};
		case GET_ALL_STUDIES:
			return {
				...state,
				allStudies: payload.sort((a, b) => {
					return Date.parse(b.date) - Date.parse(a.date);
				}),
				filtered: payload.sort((a, b) => {
					return Date.parse(b.date) - Date.parse(a.date);
				}),
				loaded: true
			};
		case GET_FILTERED:
			return {
				...state,
				filtered: payload,
				loaded: true
			};
		case DELETE_STUDY:
			return {
				...state,
				filtered: state.filtered.filter((study) => study._id !== payload)
				// allStudies: state.allStudies.filter(study => study._id !== payload)
			};
		case DELETE_ERROR:
			return {
				...state,
				error: payload
			};
		default:
			return state;
	}
}
