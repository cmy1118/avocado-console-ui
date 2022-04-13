import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../../../../api/constants';

const NAME = 'IAM_GRANT_POLICY_BY_ROLE';

//사용자 그룹을 대상으로 Role 권한을 부여한다.
const grantAction = createAsyncThunk(`${NAME}/GRANT`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/iam/roles/${payload.roleId}/policy-templates`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

//사용자 그룹을 대상으로 부여된 Role 권한을 해제한다.
const revokeAction = createAsyncThunk(`${NAME}/REVOKE `, async (payload) => {
	const response = await Axios.delete(
		`/open-api/v1/iam/roles/${payload.roleId}/policy-templates`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				templateId: payload.templateId,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

//사용자 그룹을 대상으로 부여된 Role 권한을 조회한다.
const getsAction = createAsyncThunk(`${NAME}/GETS`, async (payload) => {
	const response = await Axios.get(
		`/open-api/v1/iam/roles/policy-templates`,
		{
			headers: {
				'Content-Type': 'application/json',
				Range: payload.range,
			},
			params: {
				roleId: payload.roleId,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return {data: response.data, headers: response.headers};
});

const slice = createSlice({
	name: NAME,
	initialState: {
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.roles,
	(state) => state.groupList,
	(state) => state.error,
	(state) => state.loading,
	(roles, groupList, error, loading) => {
		return {roles, groupList, error, loading};
	},
);

const IAM_GRANT_POLICY_BY_ROLE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		grantAction,
		revokeAction,
		getsAction,
	},
};

export default IAM_GRANT_POLICY_BY_ROLE;
