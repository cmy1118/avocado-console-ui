import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'DIALOG_BOX',
	initialState: {
		alert: {open: false},
		nextAction: null,
	},
	reducers: {
		/**************************************************
		 * ambacc244 - 알림창 열기
		 **************************************************/
		openAlert: (state, {payload}) => {
			state.alert = {open: true, key: payload.key};
		},

		/**************************************************
		 * ambacc244 - 알림창을 닫은후 처리해야 할 작업이 완료
		 **************************************************/
		setNextAction: (state) => {
			state.nextAction = null;
		},

		/**************************************************
		 * ambacc244 - 알림창 닫기
		 **************************************************/
		closeAlert: (state, {payload}) => {
			//알림창을 닫은후 처리해야 하는 action이 있음
			if (payload?.isConfirmed) {
				//action의 key를 저장
				state.nextAction = state.alert.key;
			}
			//알림창 닫기
			state.alert = {open: false};
		},
	},
});

const selectAllState = createSelector(
	(state) => state.alert,
	(state) => state.nextAction,
	(alert, nextAction) => {
		return {alert, nextAction};
	},
);

// NAME 의 value 값으로 변수명 선언
const DIALOG_BOX = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {},
};

export default DIALOG_BOX;
