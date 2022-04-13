import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../../../api/constants';
import {contentType} from '../../../../../utils/auth';

const NAME = 'IAM_USER_GROUP';

//todo : this function requires id, companyId, name, password, email, telephone and mobile
const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/iam/user-groups`,
		{
			name: payload.name,
			userGroupTypeId: payload.userGroupTypeId,
			parentId: payload.parentId,
			members: payload.members || [],
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
//todo : this function requires uid, name and password
const updateAction = createAsyncThunk(`${NAME}/UPDATE`, async (payload) => {
	const response = await Axios.put(
		`/open-api/v1/iam/user-groups/${payload.id}`,
		{
			name: payload.name,
			userGroupTypeId: payload.userGroupTypeId,
			members: payload.members, // uid
			targetParentId: payload.targetParentId,
		},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

//todo : this function requires uid
const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await Axios.delete(
		`/open-api/v1/iam/user-groups/${payload.id}`,
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

//todo : this function requires id
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/user-groups/${payload.id}`,
			{
				headers: {
					'Content-Type': contentType.JSON,
				},
				aseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return response.data;
	},
);

//todo : this function requires uid
const findAllAction = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	const response = await Axios.get(`/open-api/v1/iam/user-groups`, {
		params: {
			name: payload.name,
			groupTypeId: payload.groupTypeId,
			parentId: payload.parentId,
			keyword: payload.keyword,
			id: payload.ids,
			createdTime: payload.createdTime,
		},
		headers: {
			'Content-Type': contentType.JSON,
			Range: payload.range,
		},
		aseURL: process.env.REACT_APP_OPEN_API_URL,
	});
	console.log(response);

	return {data: response.data, headers: response.headers};
});

const slice = createSlice({
	name: NAME,
	initialState: {
		group: null,
		groups: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[createAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[updateAction.pending]: (state) => {
			state.loading = true;
		},
		[updateAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[updateAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[deleteAction.pending]: (state) => {
			state.loading = true;
		},
		[deleteAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[deleteAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findByIdAction.pending]: (state) => {
			state.loading = true;
		},
		[findByIdAction.fulfilled]: (state, action) => {
			state.group = action.payload;
			state.loading = false;
		},
		[findByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findAllAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllAction.fulfilled]: (state, action) => {
			state.groups = action.payload.data;
			state.loading = false;
		},
		[findAllAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.groups,
	(state) => state.group,
	(groups, group) => {
		return {groups, group};
	},
);

// NAME 의 value 값으로 변수명 선언
const IAM_USER_GROUP = {
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

export default IAM_USER_GROUP;
