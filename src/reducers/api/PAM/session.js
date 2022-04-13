import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../api/constants';

const NAME = 'PAM_SESSION';

const findSessionAction = createAsyncThunk(
	`${NAME}/FIND_SESSION`,
	async (payload) => {
		const response = await Axios.get(`/open-api/v1/pam/sessions`, {
			params: {
				userUids: payload.userUids,
			},
			headers: {
				Range: payload.range,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
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
