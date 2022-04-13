import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../utils/auth';
import {Axios} from '../../../../../api/constants';

const NAME = 'PAM_FILE_MANAGEMENT_TEMPLATE';

/**************************************************
 * seob717 - PAM file template create action
 **************************************************/
const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/pam/file-templates`,
		{
			name: payload.name,
			description: payload.description,
			details: payload.details,
			// details: {
			// 	effect: false,
			// 	pattern: `/usr/resource/img`,
			// 	permissions: [1, 2, 4],
			// },
		},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log(response);
	return response;
});

/**************************************************
 * seob717 - PAM file template update action
 **************************************************/
const updateAction = createAsyncThunk(`${NAME}/UPDATE`, async (payload) => {
	const response = await Axios.put(
		`/open-api/v1/pam/file-template/${payload.templateId}`,
		{},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log(response);
	return response;
});

/**************************************************
 * seob717 - PAM file template delete action
 **************************************************/
const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await Axios.delete(
		`/open-api/v1/pam/file-template/${payload.templateId}`,
		{
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log(response);
	return response;
});

/**************************************************
 * seob717 - PAM file template findById action
 **************************************************/
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/file-template/${payload.templateId}`,
			{
				aseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		console.log(response);
		return response;
	},
);

/**************************************************
 * seob717 - PAM file template findAll action
 **************************************************/
const findAllAction = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	const response = await Axios.get(`/open-api/v1/pam/file-templates`, {
		headers: {
			Range: payload.range,
		},
		params: {
			filter: payload.filter,
		},
		aseURL: process.env.REACT_APP_OPEN_API_URL,
	});
	console.log(response);
	return response;
});

/**************************************************
 * seob717 - PAM file template getEvents action
 **************************************************/
const getEventsAction = createAsyncThunk(
	`${NAME}/GET_EVENTS`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/file-templates/events`,
			{
				headers: {
					'Content-Type': contentType.JSON,
					Range: payload.range,
				},
				params: {
					fromTime: payload.fromTime,
					toTime: payload.toTime,
					templateId: payload.templateId,
					filter: payload.filter,
				},
				aseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		console.log(response);
		return response;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {},
	reducers: {},
	extraReducers: {},
});

const selectAllState = createSelector(
	() => {},
	() => {
		return {};
	},
);

const PAM_FILE_MANAGEMENT_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		updateAction,
		deleteAction,
		findByIdAction,
		findAllAction,
		getEventsAction,
	},
};

export default PAM_FILE_MANAGEMENT_TEMPLATE;
