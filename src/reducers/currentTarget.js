import {createSelector, createSlice} from '@reduxjs/toolkit';
import {indexOf} from 'lodash';

const slice = createSlice({
	name: 'currentTarget',
	initialState: {
		currentTarget: [],
	},

	reducers: {
		setCurrentTarget: (state, action) => {
			const tablekey = action.payload.tableKey;
			const selectedRows = action.payload.selectedRows;
			const isTablekey = state.currentTarget.find(
				(e) => e.tablekey === tablekey,
			);
			let CeckedElement = [];

			const CurrentTargetChecked = (tablekey) => {
				if (Array.isArray(selectedRows) && selectedRows.length === 0) {
					state.currentTarget.find(
						(v) => v.tablekey === tablekey,
					).selected = [];
				} else {
					if (tablekey === 'users') {
						selectedRows.map((v) => {
							CeckedElement.push(v.uid);
						});
					} else {
						selectedRows.map((v) => {
							CeckedElement.push(v.id);
						});
					}

					state.currentTarget.find(
						(v) => v.tablekey === tablekey,
					).selected = CeckedElement;
				}
			};

			if (isTablekey) {
				CurrentTargetChecked(tablekey);
			} else {
				state.currentTarget.push({
					tablekey: tablekey,
					selected: [],
				});
				CurrentTargetChecked(tablekey);
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
