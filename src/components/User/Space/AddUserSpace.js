import React from 'react';
import {Link} from 'react-router-dom';

import {IamContainer, PathContainer} from '../../../styles/components/style';

import AddTagToUser from '../Components/AddTagToUser';
import AssignRoleToUser from '../Components/AssignRoleToUser';
import AddUserToGroup from '../Components/AddUserToGroup';
import AddUser from '../Components/AddUser';

const AddUserSpace = () => {
	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/users'>사용자</Link>
				<div>{' > '}</div>
				<Link to='/users/add'>사용자 추가</Link>
			</PathContainer>

			<AddUser />

			<AddUserToGroup />

			<AssignRoleToUser />

			<AddTagToUser />

			{/* todo : readOnlyTable, Modal 부분 입니다. 이후 수정 예정 */}
			{/*<ModalTableContainer*/}
			{/*	title={'사용자 생성 요약보기'}*/}
			{/*	isOpened={isOpened}*/}
			{/*	setIsOpened={setIsOpened}*/}
			{/*	handleSubmit={submitUserInfo}*/}
			{/*>*/}
			{/*	<ul>*/}
			{/*		<li>사용자 계정 : {userData.data?.id}</li>*/}
			{/*		<li>사용자 이름 : {userData.data?.name}</li>*/}
			{/*		<li>이메일 주소 : {userData.data?.email}</li>*/}
			{/*		<li>전화 번호 : {userData.data?.telephone}</li>*/}
			{/*		<li>모바일 전화 번호 : {userData.data?.mobile}</li>*/}
			{/*	</ul>*/}
			{/*	<div>그룹 : {userGroupData.data?.length}</div>*/}
			{/*	<Table*/}
			{/*		tableKey={userGroupData?.key || 'a'}*/}
			{/*		data={userGroupData.data || []}*/}
			{/*		columns={*/}
			{/*			getColumnsAsKey[*/}
			{/*				'groupsIncludedInUserOnAddPageColumns'*/}
			{/*			] || []*/}
			{/*		}*/}
			{/*	/>*/}
			{/*	<div>권한 : {userRoleData.data?.length}</div>*/}
			{/*	<Table*/}
			{/*		tableKey={userRoleData?.key || 'b'}*/}
			{/*		data={userRoleData.data || []}*/}
			{/*		columns={*/}
			{/*			getColumnsAsKey[*/}
			{/*				tableKeys.rolesExcludedFromUserOnAddPage*/}
			{/*			]*/}
			{/*		}*/}
			{/*	/>*/}
			{/**/}
			{/*	<div>태그 : {userTagData.data?.length}</div>*/}
			{/*	<Table*/}
			{/*		tableKey={userTagData?.key || 'c'}*/}
			{/*		data={userTagData.data || []}*/}
			{/*		columns={getColumnsAsKey[userTagData.key] || []}*/}
			{/*	/>*/}
			{/*</ModalTableContainer>*/}
		</IamContainer>
	);
};

export default AddUserSpace;
