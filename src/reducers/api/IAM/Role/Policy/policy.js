import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../api/constants';

const NAME = 'IAM_ROLE_POLICY'
const findAllAction = createAsyncThunk(
    `${NAME}/FIND_ALL`,
    async (payload,{getState}) => {
        const {userAuth} = getState().AUTH;
        const response = await Axios.get(
            `/open-api/v1/iam/roles/${payload.roleId}/policies`,
            {
                headers: {
                    Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
                    'Content-Type': 'application/json',
                },
                baseURL: baseURL.openApi,
            },
        );
        return response.data;
    }
);


const slice = createSlice({
    name : NAME,
    initialState: {
        policy: null,
        policies : [],
        loading:false,
        error: null,
    },
    reducers: {},
    extraReducers:{
        [findAllAction.pending]: (state) => {
            state.loading = true;
        },

        [findAllAction.fulfilled]: (state , action) => {
            state.loading = false;
            state.policies = action.payload;
        },

        [findAllAction.rejected]: (state , action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
})

const selectAllState = createSelector(
    (state) => state.policy,
    (state) => state.policies,
    (policy,policies) => {
        return {policy , policies}
    }
);

const IAM_ROLE_POLICY = {
    name: slice.name,
    reducer: slice.reducer,
    selector: (state) => selectAllState(state[slice.name]),
    action: slice.actions,
    asyncAction:{
        findAllAction
    }
}

export default IAM_ROLE_POLICY;