import {createSelector, createSlice} from '@reduxjs/toolkit';

const NAME = 'IAM_ROLES';

const slice = createSlice({
	name: NAME,
	initialState: {
		roleIndex: 0,
		roles: [
			{
				id: 'role1',
				name: 'manager-role',
				description:
					'사용자 레벨의 최고 관리자인 Manager에게 부여된 역할 (기본 제공)',
				companyId: null,
				policies: ['policy1', 'policy2', 'policy3'],
				creationDate: '2021.03.02 15:55:32',
			},
			{
				id: 'role2',
				name: 'admin-role',
				description: 'Admin 사용자에게 부여 하는 역할',
				companyId: null,
				policies: ['policy1', 'policy2'],
				creationDate: '2021.03.02 15:55:32',
			},
			{
				id: 'role3',
				name: 'user-role',
				description: '일반 User에게 부여 하는 역할',
				companyId: null,
				policies: [],
				creationDate: '2021.03.02 15:55:32',
			},
			{
				id: 'role4',
				name: 'guest-role',
				description: 'Guest 사용자에게 부여하는 역할',
				companyId: null,
				policies: [],
				creationDate: '2021.03.02 15:55:32',
			},
			{
				id: 'role5',
				name: 'developerOnly-role',
				description: '개발자에게 부여하기 위한 기본 역할',
				companyId: 'netand',
				policies: [],
				creationDate: '2021.03.02 15:55:32',
			},
			{
				id: 'role6',
				name: 'operation-role',
				description: '운영자에게 부여하기 위한 기본 역할',
				companyId: null,
				policies: [],
				creationDate: '2021.03.02 15:55:32',
			},
		],
	},
	reducers: {},
});

const selectAllState = createSelector(
	(state) => state.roles,
	(roles) => {
		return {
			roles,
		};
	},
);

const IAM_ROLES = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
};

export default IAM_ROLES;
