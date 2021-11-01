import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../../../api/constants';
import faker from 'faker';
import {authType, mfa, status} from '../../../../../utils/data';

const NAME = 'IAM_USER';

//todo : this function requires id, companyId, name, password, email, telephone and mobile
const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;
		// eslint-disable-next-line no-console
		console.log(client);
		const response = await axios.post(
			`/open/api/v1/users`,
			{
				id: payload.id,
				companyId: payload.companyId,
				name: payload.name,
				password: payload.password,
				email: payload.email,
				telephone: payload.telephone,
				mobile: payload.mobile,
			},
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);
//todo : this function requires uid, name and password
const updateAction = createAsyncThunk(
	`${NAME}/UPDATE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.put(
			`/open/api/v1/users/${payload.uid}`,
			{
				name: payload.name,
				password: payload.password,
			},
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires uid
const deleteAction = createAsyncThunk(
	`${NAME}/DELETE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.delete(
			`/open/api/v1/users/${payload.uid}`,
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires id
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.get(
			`/open/api/v1/users/id/${payload.id}`,
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires uid
const findByUidAction = createAsyncThunk(
	`${NAME}/FIND_BY_UID`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.get(`/open/api/v1/users/${payload.uid}`, {
			headers: {
				Authorization: `${client.token_type} ${client.access_token}`,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

//todo : this function requires companyId, first range and last range
const findAllAction = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.get(`/open/api/v1/users`, {
			params: {
				companyId: payload.companyId,
			},
			headers: {
				Authorization: `${client.token_type} ${client.access_token}`,
				Range: `elements=${payload.first}-${payload.last}`,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		//groups, authType, MFA, tags, lastConsoleLogin, creationDate는 다른 곳으로 빠질 예정 => 아직 다른 부분 생성 전이라 users에 추가
		index: 0,
		users: [
			{
				uid: 'user1',
				id: 'ambacc244',
				name: '이영애',
				email: 'ambacc244@google.com',
				telephone: '010-9434-5272',
				mobile: '010-9434-5272',
				groups: ['group2', 'group4', 'group8'],
				roles: ['role1', 'role2'],
				status: status.NORMAL,
				authType: authType.ID,
				MFA: mfa.NONE,
				passwordExpiryTime: '2021.11.27',
				tags: [
					{
						name: 'level',
						value: 'Admin',
						permissions: [],
						creationDate: '2021.03.02 15:50:14',
					},
					{
						name: 'type',
						value: 'White',
						permissions: [1, 2, 3],
						creationDate: '2021.03.02 15:55:32',
					},
				],
				lastConsoleLogin: '2021.05.24 17:30:21',
				creationDate: '2021.01.11 14:53:30',
			},
			{
				uid: 'user2',
				id: 'seob717',
				name: '심유섭',
				email: 'seob717@google.com',
				telephone: '010-9688-5549',
				mobile: '010-9688-5549',
				groups: ['group2', 'group4', 'group8'],
				roles: ['role2', 'role4'],
				status: status.NORMAL,
				authType: authType.ID,
				MFA: mfa.EMAIL,
				passwordExpiryTime: '2021.12.14',
				tags: [
					{
						name: 'type',
						value: 'White',
						permissions: [1, 2, 3],
						creationDate: '2021.05.30 14:02:21',
					},
				],
				lastConsoleLogin: '2021.10.17 20:14:31',
				creationDate: '2021.02.12 17:03:07',
			},
			{
				uid: 'user3',
				id: 'roberto',
				name: '박건욱',
				email: 'roberto@google.com',
				telephone: '010-2225-1154',
				mobile: '010-2225-1154',
				groups: ['group3', 'group4', 'group8'],
				roles: ['role5', 'role6'],
				status: status.NORMAL,
				authType: authType.GOOGLE,
				MFA: mfa.NONE,
				passwordExpiryTime: '2021.11.30',
				tags: [
					{
						name: 'level',
						value: 'Admin',
						permissions: [],
						creationDate: '2021.08.04 12:06:10',
					},
				],
				lastConsoleLogin: '2021.08.04 13:10:49',
				creationDate: '2021.06.12 20:42:12',
			},
			{
				uid: 'user4',
				id: 'kimgap263',
				name: '김가영',
				email: 'kimgap263@google.com',
				telephone: '010-1426-8345',
				mobile: '010-1426-8345',
				groups: ['group1'],
				status: status.WAITING,
				authType: authType.NAVER,
				MFA: mfa.NONE,
				passwordExpiryTime: '2021.12.20',
				tags: [],
				lastConsoleLogin: '2021.11.02 12:00:07',
				creationDate: '2021.06.12 20:44:52',
			},
			{
				uid: 'user5',
				id: 'kyoung634',
				name: '김영우',
				email: 'kyoung634@google.com',
				telephone: '010-2634-2164',
				mobile: '010-2634-2164',
				groups: ['group1'],
				status: status.NORMAL,
				authType: authType.ID,
				MFA: mfa.NONE,
				passwordExpiryTime: '2022.01.11',
				tags: [],
				lastConsoleLogin: '2021.11.12 01:02:06',
				creationDate: '2020.03.12 18:01:06',
			},
			{
				uid: 'user6',
				id: 'hongben263',
				name: '홍정빈',
				email: 'hongben263@google.com',
				telephone: '010-9054-1028',
				mobile: '010-9054-1028',
				groups: ['group1'],
				status: status.LOCKED,
				authType: authType.KAKAO,
				MFA: mfa.NONE,
				passwordExpiryTime: '2022.01.05',
				tags: [],
				lastConsoleLogin: '2021.06.14 18:08:23',
				creationDate: '2018.04.09 16:20:27',
			},
			{
				uid: 'user7',
				id: 'airbone9403',
				name: '이공아',
				email: 'airbone9403@google.com',
				telephone: '010-2074-2657',
				mobile: '010-2074-2657',
				groups: ['group1', 'group5'],
				status: status.NORMAL,
				authType: authType.ID,
				MFA: mfa.SMS,
				passwordExpiryTime: '2021.11.20',
				tags: [],
				lastConsoleLogin: '2021.09.28 18:44:02',
				creationDate: '2019.07.05 17:01:05',
			},
			{
				uid: 'user8',
				id: 'leehyun63',
				name: '이현정',
				email: 'leehyun63@google.com',
				telephone: '010-7295-4655',
				mobile: '010-7295-4655',
				groups: ['group5'],
				status: status.NORMAL,
				authType: authType.APPLE,
				MFA: mfa.NONE,
				passwordExpiryTime: '2021.11.25',
				tags: [
					{
						name: 'type',
						value: 'Black',
						permissions: [1],
						creationDate: '2020.12.23 17:59:14',
					},
				],
				lastConsoleLogin: '2021.10.28 22:14:20',
				creationDate: '2020.04.15 20:07:55',
			},
			{
				uid: 'user9',
				id: 'minmin2',
				name: '박민수',
				email: 'minmin2@google.com',
				telephone: '010-5543-2362',
				mobile: '010-5543-2362',
				groups: [],
				status: status.UNAUTHORIZED,
				authType: authType.ID,
				MFA: mfa.NONE,
				passwordExpiryTime: '2021.11.27',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.11.01 15:06:20',
			},
			{
				uid: 'user10',
				id: 'receipt77',
				name: '우문휘',
				email: 'receipt77@google.com',
				telephone: '010-1256-7345',
				mobile: '010-1256-7345',
				groups: ['group6'],
				status: status.DELETED,
				authType: authType.GOOGLE,
				MFA: mfa.NONE,
				passwordExpiryTime: '2022.02.12',
				tags: [],
				lastConsoleLogin: '2019.12.09. 17:43:51',
				creationDate: '2019.04.13. 10:24:06',
			},
		],
		loading: false,
		error: null,
	},
	reducers: {
		addUser: (state, action) => {
			state.users.unshift({
				uid: action.payload.id + '_' + state.index.toString(),
				id: action.payload.id,
				name: action.payload.name,
				email: action.payload.email,
				telephone: action.payload.telephone,
				mobile: action.payload.mobile,
				groups: [],
				status: 5,
				authType: 'ID/PWD',
				MFA: null,
				passwordExpiryTime: String(faker.date.future()),
				tags: [],
				lastConsoleLogin: null,
				creationDate: String(new Date()),
			});
			state.index++;
		},

		deleteUser: (state, action) => {
			let users = state.users;
			action.payload.currentTarget.map((target) => {
				users = onDeleteUser(users, target);
			});
			state.users = users;
		},

		addRolesToUser: (state, action) => {
			const user = state.users.find((v) => v.uid === action.payload.uid);

			user.roles = user.roles.concat(action.payload.roles);
		},

		deleteRolesFromUser: (state, action) => {
			const user = state.users.find((v) => v.uid === action.payload.uid);

			user.roles = user.roles.filter(
				(v) => !action.payload.roles.includes(v),
			);
		},

		addGroupsToUser: (state, action) => {
			const user = state.users.find((v) => v.uid === action.payload.uid);

			user.groups = user.groups.concat(action.payload.groups);
		},

		deleteGroupsFromUser: (state, action) => {
			const user = state.users.find((v) => v.uid === action.payload.uid);

			user.groups = user.groups.filter(
				(v) => !action.payload.groups.includes(v),
			);
		},
		//그룹 상세 상용자Tab
		addUsersToGroup: (state, action) => {
			const users = state.users.filter((v) =>
				action.payload.users.includes(v.uid),
			);

			users.map((v) => {
				v.groups.push(action.payload.id);
				return v;
			});
		},
		deleteUsersFromGroup: (state, action) => {
			const users = state.users.filter((v) =>
				action.payload.users.includes(v.uid),
			);

			users.map((v) => {
				const index = v.groups.findIndex(
					(val) => val === action.payload.id,
				);
				v.groups.splice(index, 1);
				return v;
			});
		},
	},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[createAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[updateAction.pending]: (state) => {
			state.loading = true;
		},
		[updateAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[updateAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[deleteAction.pending]: (state) => {
			state.loading = true;
		},
		[deleteAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[deleteAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findByIdAction.pending]: (state) => {
			state.loading = true;
		},
		[findByIdAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[findByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findByUidAction.pending]: (state) => {
			state.loading = true;
		},
		[findByUidAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[findByUidAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findAllAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[findAllAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.users,
	(state) => state.error,
	(state) => state.loading,
	(users, error, loading) => {
		return {users, error, loading};
	},
);

/******************************************/
/* roberto : Table_update 삭제 기능추가
/*
/******************************************/
function onDeleteUser(users, target) {
	users.map((u, index) => {
		u.id === target.id ? users.splice(index, 1) : '';
	});
	return users;
}
/******************************************/

// NAME 의 value 값으로 변수명 선언
const IAM_USER = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		updateAction,
		deleteAction,
		findByIdAction,
		findByUidAction,
		findAllAction,
	},
};

export default IAM_USER;
