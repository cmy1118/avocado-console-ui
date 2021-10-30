import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import styled from 'styled-components';
import ModalFormContainer from '../../RecycleComponents/ModalFormContainer';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import * as yup from 'yup';
import NewForm from '../../RecycleComponents/New/newForm';
import NewInput from '../../RecycleComponents/New/NewInput';

const _Title = styled.div`
	display: flex;
	justify-content: space-between;
`;

const GroupSummary = ({groupId}) => {
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const [isOpened, setIsOpened] = useState(false);

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);

	const userData = useMemo(() => {
		return users
			.filter((v) => group.members.includes(v.uid))
			.map((v) => ({...v, groupsLength: v.groups.length}));
	}, [users, group]);

	const tagData = useMemo(() => {
		return group.tags.map((v) => ({
			...v,
			id: v.name,
			numberOfPermissions: v.permissions.length,
		}));
	}, [group]);

	const onSubmitChangeGroupName = useCallback((data) => {
		alert(JSON.stringify({...data}));
		setIsOpened(false);
	}, []);

	const schema = {
		name: yup
			.string()
			.min(10, '최소 길이는 10자 입니다.')
			.max(40, '최대 길이는 100자 입니다.'),
	};

	return (
		<>
			<ModalFormContainer
				isOpened={isOpened}
				setIsOpened={setIsOpened}
				title={'그룹명 변경'}
				submitKey={'changeGroupName'}
			>
				<NewForm
					submitKey={'changeGroupName'}
					initialValues={{name: group?.name}}
					onSubmit={onSubmitChangeGroupName}
				>
					<NewInput
						label={'사용자 그룹명'}
						name={'name'}
						placeholder={'그룹명을 입력하세요'}
					/>
				</NewForm>
			</ModalFormContainer>
			<_Title>
				<div>요약 [ {group?.name} ]</div>
				<div>
					<button onClick={() => setIsOpened(true)}>
						그룹명 편집
					</button>
					<button>삭제</button>
				</div>
			</_Title>
			<ul>
				<li>그룹명 : {group?.name}</li>
				<li>
					그룹 유형 :{' '}
					{
						groupTypes.find((v) => v.id === group.clientGroupTypeId)
							.name
					}
				</li>
				<li>생성 일시 : {group?.creationDate}</li>
			</ul>

			<div>사용자: {userData.length}</div>
			<Table
				data={userData}
				tableKey={tableKeys.groups.summary.user}
				columns={tableColumns[tableKeys.groups.summary.user]}
			/>
			<div>태그: {tagData.length}</div>
			<Table
				data={tagData}
				tableKey={tableKeys.groups.summary.tag}
				columns={tableColumns[tableKeys.groups.summary.tag]}
			/>
		</>
	);
};

GroupSummary.propTypes = {
	groupId: PropTypes.string.isRequired,
};
export default GroupSummary;
