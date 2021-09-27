import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'currentTarget',
	initialState: {
		currentTarget: [],
	},

	reducers: {
		setCurrentTarget: (state, action) => {
			const tablekey = action.payload.tableKey;
			if (tablekey === 'users') {
				state.currentTarget = [];
				action.payload.selectedRows.map((selected) => {
					const data = {
						uid: selected.uid,
						tablekey: tablekey,
					};
					state.currentTarget.push(data);
				});
			} else {
				state.currentTarget = [];
				action.payload.selectedRows.map((selected) => {
					const data = {
						id: selected.id,
						tablekey: tablekey,
					};
					state.currentTarget.push(data);
				});
			}
		},
	},

	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.currentTarget,

	(currentTarget) => {
		return {
			currentTarget,
		};
	},
);

export const currentTargetSelector = {
	all: (state) => selectAllState(state[CURRENT_TARGET]),
};
export const CURRENT_TARGET = slice.name;
export const currentTargetReducer = slice.reducer;
export const currentTargetAction = slice.actions;
