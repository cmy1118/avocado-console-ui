import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'CURRENT_TARGET',
	initialState: {
		currentTarget: [],
	},

	reducers: {
		setCurrentTarget: (state, action) => {
			const tablekey = action.payload.tableKey;
			const selectedRows = action.payload.selectedRows;
			const isTablekey = state.currentTarget.find(
				(v) => v.tablekey === tablekey,
			);
			let CheckedElement = [];

			const CurrentTargetChecked = (tablekey) => {
				if (Array.isArray(selectedRows) && selectedRows.length === 0) {
					state.currentTarget.find(
						(v) => v.tablekey === tablekey,
					).selected = [];
				} else {
					if (tablekey === 'users') {
						selectedRows.map((v) => {
							CheckedElement.push(v.uid);
						});
					} else {
						selectedRows.map((v) => {
							CheckedElement.push(v.id);
						});
					}

					state.currentTarget.find(
						(v) => v.tablekey === tablekey,
					).selected = CheckedElement;
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
