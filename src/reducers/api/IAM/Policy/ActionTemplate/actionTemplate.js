import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../api/constants';

/********************************************************
 *
 * 권한 템플릿 상세 관리 Reducer
 *
 ********************************************************/

const NAME = 'IAM_POLICY_ACTION_TEMPLATE';

//권한 템플릿 상세 정보를 조회
const findAllAction = createAsyncThunk(
    `${NAME}/FINDALL`,
    async (payload, {getState}) => {
        const {userAuth} = getState().AUTH;

        const response = await Axios.get(`/open-api/v1/iam/action-templates/details`, {
            params: {
                templateId: payload.templateId,
                resource: payload.resource,
                action: payload.action,
                effect: payload.effect,
            },
            headers: {
                Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
                'Content-Type': 'application/json',
                Range: payload.range,
            },
            baseURL: baseURL.openApi,
        });
        return {data: response.data, headers: response.headers};
    },
);

const slice = createSlice({
    name: NAME,
    initialState: {
        //actionTemplates 관리 변수
        actionTemplates: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [findAllAction.pending]: (state) => {
            state.loading = true;
        },
        [findAllAction.fulfilled]: (state, action) => {
            state.actionTemplates = action.payload.data;
            state.loading = false;
        },
        [findAllAction.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

const selectAllState = createSelector(
    (state) => state.actionTemplates,
    (state) => state.error,
    (state) => state.loading,
    (members, error, loading) => {
        return {members, error, loading};
    },
);

// NAME 의 value 값으로 변수명 선언
const IAM_POLICY_ACTION_TEMPLATE = {
    name: slice.name,
    reducer: slice.reducer,
    selector: (state) => selectAllState(state[slice.name]),
    action: slice.actions,
    asyncAction: {
        findAllAction,
    },
};

export default IAM_POLICY_ACTION_TEMPLATE;
