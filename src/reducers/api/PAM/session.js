import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../api/constants';

const NAME = 'PAM_SESSION';

const findSessionAction = createAsyncThunk(
	`${NAME}/FIND_SESSION`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;

		const response = await Axios.get(`/open-api/v1/pam/sessions`, {
			params: {
				userUids: payload.userUids,
			},
			headers: {
				Authorization: `${user.token_type} ${user.access_token}`,
				Range: payload.range,
			},
			baseURL: baseURL.openApi,
		});
		return {data: response.data, headers: response.headers};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {},
	reducers: {},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.roles,
	(roles) => {
		return {
			roles,
		};
	},
);

const PAM_SESSION = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findSessionAction,
	},
};

export default PAM_SESSION;