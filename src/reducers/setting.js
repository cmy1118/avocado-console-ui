import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'SETTING',
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

// NAME 의 value 값으로 변수명 선언
const SETTING = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {},
};

export default SETTING;
