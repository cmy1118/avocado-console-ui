import {createSelector, createSlice} from '@reduxjs/toolkit';

const NAME = 'IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE';

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
	(state) => state.loading,
	(state) => state.error,

	(loading) => {
		return {loading};
	},
);

const IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {},
};

export default IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE;
