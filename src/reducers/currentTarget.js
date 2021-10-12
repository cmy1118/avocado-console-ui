import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'CURRENT_TARGET',
	initialState: {
		currentTarget: [],
	},

	reducers: {
		changeSelectedRows: (state, action) => {
			state.currentTarget = state.currentTarget.filter(
				(v) => v.tableKey !== action.payload.tableKey,
			);
			state.currentTarget.push(action.payload);
		},

		setSelectedRows: (state, action) => {
			state.currentTarget = state.currentTarget.filter(
				(v) => v.tableKey !== action.payload.tableKey,
			);
		},
	},
});

const selectAllState = createSelector(
	(state) => state.currentTarget,

	(currentTarget) => {
		return {
			currentTarget,
		};
	},
);

const CURRENT_TARGET = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {},
};

export default CURRENT_TARGET;
