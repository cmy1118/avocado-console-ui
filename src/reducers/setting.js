import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'setting',
	initialState: {
		theme: 'light', // light, dark
		language: 'ko-KR', // language ko-KR - korean, en-US - english
	},
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setLanguage: (state, action) => {
			state.language = action.payload;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.theme,
	(state) => state.language,
	(theme, language) => {
		return {
			theme,
			language,
		};
	},
);

export const settingSelector = {
	all: (state) => selectAllState(state[SETTING]),
};
export const SETTING = slice.name;
export const settingReducer = slice.reducer;
export const settingAction = slice.actions;
