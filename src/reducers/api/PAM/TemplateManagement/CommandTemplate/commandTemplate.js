import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../utils/auth';
import {Axios} from '../../../../../api/constants';

const NAME = 'PAM_COMMAND_MANAGEMENT_TEMPLATE';

/**************************************************
 * seob717 - PAM command template create action
 **************************************************/
const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/pam/command-templates`,
		{
			name: payload.name,
			typeCode: payload.typeCode,
			description: payload.description,
			details: payload.details,
			// details: {
			// 	effect: ???, 효과 | Allow : true, Deny : false
			// 	ruleTypeCode: ???, 규칙 유형 | RegularExpression : 정규표현식, CommandAndOption : 명령어 & 옵션
			// 	command: ???, 명령어 (패턴) | 규칙 유형이 RegularExpression이면 정규 표현식 패턴, CommandAndOption이면, 명령어 문자열
			// 	commandOptions: ??? , 명령어 옵션 (규칙 유형이 CommandAndOption일 경우만 가능) | JSON ARRAY
			// },
		},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log(response);
	return response;
});

/**************************************************
 * seob717 - PAM command template update action
 **************************************************/
const updateAction = createAsyncThunk(`${NAME}/UPDATE`, async (payload) => {
	const response = await Axios.put(
		`/open-api/v1/pam/command-templates`,
		{
			id: payload.templateId,
			name: payload.name,
			typeCode: payload.typeCode,
			description: payload.description,
			details: payload.details,
		},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log(response);
	return response;
});

/**************************************************
 * seob717 - PAM command template delete action
 **************************************************/
const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await Axios.delete(
		`/open-api/v1/pam/command-templates/${payload.templateId}`,
		{
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log(response);
	return response;
});

/**************************************************
 * seob717 - PAM command template findById action
 **************************************************/
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/command-templates/${payload.templateId}`,
			{
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		console.log(response);
		return response;
	},
);

/**************************************************
 * seob717 - PAM command template findAll action
 **************************************************/
const findAllAction = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	const response = await Axios.get(`/open-api/v1/pam/command-templates`, {
		headers: {
			Range: payload.range,
		},
		baseURL: process.env.REACT_APP_OPEN_API_URL,
	});
	console.log(response);
	return response;
});

/**************************************************
 * seob717 - PAM command template getEvents action
 **************************************************/
const getEventsAction = createAsyncThunk(
	`${NAME}/GET_EVENTS`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/command-templates/events`,
			{
				headers: {
					'Content-Type': contentType.JSON,
					Range: payload.range,
				},
				params: {
					fromTime: payload.fromTime,
					toTime: payload.toTime,
					eventType: payload.eventType,
					id: payload.templateId,
					name: payload.name,
					applicationCode: payload.applicationCode,
					clientId: payload.clientId,
					uid: payload.uid,
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

const PAM_COMMAND_MANAGEMENT_TEMPLATE = {
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

export default PAM_COMMAND_MANAGEMENT_TEMPLATE;
