import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../api/constants';

/********************************************************
 *
 * 권한 템플릿 관리 Reducer
 *
 ********************************************************/

const NAME = 'IAM_POLICY_ACTION_TEMPLATE';
//권한 템플릿 상세 정보를 조회
const createAction = createAsyncThunk(
    `${NAME}/CREATE`,
    async (payload, {getState}) => {
        const {userAuth} = getState().AUTH;

        const response = await Axios.post(`/open-api/v1/iam/action-templates`,
            {
                id: payload.id,
                name: payload.name,
                description: payload.description,
                details: payload.details,
            },
            {
                headers: {
                    Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
                    'Content-Type': 'application/json',
                },
            baseURL: baseURL.openApi,
          },
        );
        console.log('createAction:',response)
        return response;
    },
);

/********************************************************
 *
 * 권한 템플릿 상세 관리 Reducer
 *
 ********************************************************/


//권한 템플릿 상세 정보를 조회
const findAllDetailAction = createAsyncThunk(
    `${NAME}/FINDALL_DETAIL`,
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
        //actionTemplates 관리 state ( create 할 action 들을 tmeplateId 별로 담을 state )
        actionTemplates: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [createAction.pending]: (state) => {
            state.loading = true;
        },
        [createAction.fulfilled]: (state, action) => {
            state.actionTemplates = action.payload.data;
            state.loading = false;
        },
        [createAction.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        [findAllDetailAction.pending]: (state) => {
            state.loading = true;
        },
        [findAllDetailAction.fulfilled]: (state, action) => {
            state.actionTemplates = action.payload.data;
            state.loading = false;
        },
        [findAllDetailAction.rejected]: (state, action) => {
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
        createAction,
        findAllDetailAction,
    },
};

export default IAM_POLICY_ACTION_TEMPLATE;
