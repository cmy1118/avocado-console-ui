import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../utils/auth';
import {Axios} from '../../../../../api/constants';

const NAME = 'PAM_COMMAND_MANAGEMENT_TEMPLATE_DETAIL';

/**************************************************
 * seob717 - PAM command template create action
 **************************************************/
const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/pam/command-templates-detail`,
		[payload.commandTemplateDetailList],

		// commandTemplateDetailList 는 아래 객체의 배열
		// {
		// templateId: 'KR-2020-0001:100:202203:0029',
		// effect: true,
		// ruleTypeCode: 'RegularExpression',
		// command: 'testDetail1',
		// commandOption: null,
		// }
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
		`/open-api/v1/pam/command-templates-detail`,
		[payload.commandTemplateDetailList],

		// commandTemplateDetailList 는 아래 객체의 배열
		// {
		// 	"templateId":"KR-2020-0001:202203:1:0024",
		// 	"seq":4,
		// 	"id":"KR-2020-0001:202203:1:0007",
		// 	"effect":"1",
		// 	"ruleTypeCode":"1",
		// 	"command":"test1",
		// 	"commandOption": ["ef1", "r1"]
		// }
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
 * seob717 - PAM command template delete action
 **************************************************/
const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await Axios.delete(
		`/open-api/v1/pam/command-templates-detail/${payload.templateId}/${payload.seq}`,
		{
			aseURL: process.env.REACT_APP_OPEN_API_URL,
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
			`/open-api/v1/pam/command-templates-detail/${payload.templateId}/${payload.seq}`,
			{
				aseURL: process.env.REACT_APP_OPEN_API_URL,
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
	const response = await Axios.get(
		`/open-api/v1/pam/command-templates-detail/${payload.templateId}`,
		{
			headers: {
				Range: payload.range,
			},
			params: {
				templateId: payload.templateId,
				effect: payload.effect,
				pattern: payload.pattern,
			},
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log(response);
	return response;
});

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

const PAM_COMMAND_MANAGEMENT_TEMPLATE_DETAIL = {
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
	},
};

export default PAM_COMMAND_MANAGEMENT_TEMPLATE_DETAIL;
