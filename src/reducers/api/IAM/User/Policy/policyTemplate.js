import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../../../api/constants';
import {contentType} from '../../../../../utils/auth';

const NAME = 'IAM_POLICY_TEMPLATE';

//사용자 그룹을 대상으로 Role 권한을 부여한다.

//사용자 그룹을 대상으로 부여된 Role 권한을 조회한다.
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/policy-templates/${payload.templateId}`,
			{
				headers: {
					'Content-Type': contentType.JSON,
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return {data: response.data, headers: response.headers};
	},
);

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

const IAM_POLICY_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findByIdAction,
	},
};

export default IAM_POLICY_TEMPLATE;
