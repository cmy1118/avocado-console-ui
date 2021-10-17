import {createSelector, createSlice} from '@reduxjs/toolkit';
import {changeId} from '../utils/redux';

const slice = createSlice({
	name: 'CURRENT_TARGET',
	initialState: {
		currentTarget: {},
		currentDropId: {},
	},
	reducers: {
		changeSelectedRows: (state, action) => {
			state.currentTarget[action.payload.tableKey] =
				action.payload.selected;
		},
		setSelectedRows: (state, action) => {
			delete state.currentTarget[action.payload.tableKey];
		},
		changeDropId: (state, action) => {
			state.currentTarget[action.payload.tableKey].map((id) => {
				state.currentDropId[action.payload.dndKey] = changeId(
					state.currentDropId[action.payload.dndKey],
					id,
				);
			});
		},
		setDropId: (state, action) => {
			delete state.currentDropId[action.payload.dndKey];
		},
	},
});

const selectAllState = createSelector(
	(state) => state.currentTarget,
	(state) => state.currentDropId,

	(currentTarget, currentDropId) => {
		return {
			currentTarget,
			currentDropId,
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
