import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../../../api/constants';

// import qs from 'qs';
// axios.default.paramsSerializer = (params) => {
// 	return qs.stringify(params);
// };

const NAME = 'IAM_USER_GROUP_MEMBER';

//todo : this function requires id, companyId, name, password, email, telephone and mobile
const joinAction = createAsyncThunk(
	`${NAME}/JOIN`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		console.log(user);
		const response = await axios.put(
			`/open-api/v1/iam/user-group-sets/${payload.groupId}`,
			[...payload.userUid],
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);
//todo : this function requires uid, name and password
const disjointAction = createAsyncThunk(
	`${NAME}/DISJOINT`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;

		const response = await axios.delete(
			`/open-api/v1/iam/user-group-sets/${payload.groupId}`,
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					'Content-Type': 'application/json',
				},
				params: {
					userUid: payload.userUid,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires uid
const findAllAction = createAsyncThunk(
	`${NAME}/FINDALL`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;

		const response = await axios.get(`/open-api/v1/iam/user-group-sets`, {
			params: {groupId: payload.groupId},
			headers: {
				Authorization: `${user.token_type} ${user.access_token}`,
				'Content-Type': 'application/json',
				Range: payload.range,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		//groups, authType, MFA, tags, lastConsoleLogin, creationDate는 다른 곳으로 빠질 예정 => 아직 다른 부분 생성 전이라 users에 추가
		members: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[joinAction.pending]: (state) => {
			state.loading = true;
		},
		[joinAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[joinAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[disjointAction.pending]: (state) => {
			state.loading = true;
		},
		[disjointAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[disjointAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findAllAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllAction.fulfilled]: (state, action) => {
			state.members = action.payload;
			state.loading = false;
		},
		[findAllAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.members,
	(state) => state.error,
	(state) => state.loading,
	(members, error, loading) => {
		return {members, error, loading};
	},
);

// NAME 의 value 값으로 변수명 선언
const IAM_USER_GROUP_MEMBER = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		joinAction,
		disjointAction,
		findAllAction,
	},
};

export default IAM_USER_GROUP_MEMBER;
