import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../utils/auth';
import {Axios, baseURL} from '../../../../../api/constants';

const NAME = 'PAM_FILE_MANAGEMENT_TEMPLATE_DETAIL';

/**************************************************
 * seob717 - PAM file template create action
 **************************************************/
const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/pam/file-templates/${payload.templateId}/details`,
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
			baseURL: baseURL.openApi,
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
		`/open-api/v1/pam/file-template/${payload.templateId}/details/${payload.seq}`, // seq : 파일 템플릿 상세순번
		{
			effect: payload.effect,
			pattern: payload.pattern,
			permissions: payload.permissions,
		},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: baseURL.openApi,
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
		`/open-api/v1/pam/file-template/${payload.templateId}/details/${payload.seq}`,
		{
			baseURL: baseURL.openApi,
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
			`/open-api/v1/pam/file-template/${payload.templateId}/details/${payload.seq}`,
			{
				baseURL: baseURL.openApi,
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
	const response = await Axios.get(
		`/open-api/v1/pam/file-templates/details`,
		{
			headers: {
				Range: payload.range,
			},
			params: {
				templateId: payload.templateId,
				effect: payload.effect,
				pattern: payload.pattern,
			},
			baseURL: baseURL.openApi,
		},
	);
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
					effect: payload.effect,
					pattern: payload.pattern,
				},
				baseURL: baseURL.openApi,
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

const PAM_FILE_MANAGEMENT_TEMPLATE_DETAIL = {
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

export default PAM_FILE_MANAGEMENT_TEMPLATE_DETAIL;
