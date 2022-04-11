import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {Axios, baseURL} from '../../../../api/constants';
import {contentType} from '../../../../utils/auth';

const NAME = 'RRM_GROUP';

/**************************************************
 * ambacc244 - RRM 그룹 하위의 그룹 로드 요청 액션
 **************************************************/
const findAllGroupAction = createAsyncThunk(
	`${NAME}/FIND_ALL_GROUP`,
	async (payload) => {
		const response = await Axios.get(`/open-api/v1/rrm/groups`, {
			params: {
				name: payload.name,
				groupTypeId: payload.groupTypeId,
				parentId: payload?.parentId,
			},
			headers: {
				'Content-Type': contentType.JSON,
				Range: 'elements=0-50',
			},
			baseURL: baseURL.openApi,
		});
		return {id: payload.parentId, data: response.data};
	},
);

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
	(loading, error) => {
		return {loading, error};
	},
);

const RRM_GROUP = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {findAllGroupAction},
};

export default RRM_GROUP;
