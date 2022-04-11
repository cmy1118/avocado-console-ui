import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {contentType} from "../../../../../../utils/auth";
import {baseURL} from "../../../../../../api/constants";

const NAME = 'IAM_POLICY_GRANT_REVOKE_ROLE';

// 역할에 정책 부여
const grantAction = createAsyncThunk(
    `${NAME}/GRANT`,
    async (payload,{getState}) => {
        const {userAuth} = getState().AUTH;

        const response = await axios.post(
            `/open-api/v1/iam/roles/${payload.roleId}/policies/${payload.policyId}`,
            {
                order:payload.order
            },
            {
                headers: {
                    Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
                    'Content-Type': contentType.JSON,
                },
                baseURL: baseURL.openApi,
            });
            return response;
    },
)



const slice = createSlice({
    name: NAME,
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [grantAction.pending] : (state) =>{
            state.loading = true;
        },

        [grantAction.fulfilled] : (state,action) =>{
            state.loading = false;
            state.policies = action.payload;
        },

        [grantAction.rejected] : (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        }
    },
});

const selectAllState = createSelector(
    (state) => state.loading,
    (state) => state.error,

    (loading) => {
        return {loading};
    },
);

const IAM_POLICY_MANAGEMENT_GRANT_REVOKE = {
    name: slice.name,
    reducer: slice.reducer,
    selector: (state) => selectAllState(state[slice.name]),
    action: slice.actions,
    asyncAction: {
        grantAction,
    },
};

export default IAM_POLICY_MANAGEMENT_GRANT_REVOKE;