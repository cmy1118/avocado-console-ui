import React, {useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import ModalFormContainer from '../../RecycleComponents/ModalFormContainer';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import * as yup from 'yup';
import Form from '../../RecycleComponents/New/Form';
import TextBox from '../../RecycleComponents/New/TextBox';
import {Label, LiText} from '../../../styles/components/text';
import {
	dummyDates,
	dummyPolicyOnGroup,
	dummyUsers,
} from '../../../utils/dummyData';
import {ReadOnlyTableSpace} from '../../../styles/components/table';
import ReadOnlyTable from '../../Table/ReadOnlyTable';
import TableContainer from '../../Table/TableContainer';

const GroupSummary = ({groupId}) => {
	const formRef = useRef(null);

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
			.map((v, i) => ({
				...v,
				groupsLength: v.groups.length,
				grantUser: dummyUsers[i],
			}));
	}, [users, group]);

	const roleData = useMemo(() => dummyPolicyOnGroup, []);

	const tagData = useMemo(() => {
		return group.tags.map((v, i) => ({
			...v,
			id: v.name,
			numberOfPermissions: v.permissions.length,
			creationDate: dummyDates[i],
		}));
	}, [group]);

	const validation = {
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
				innerRef={formRef}
			>
				<Form
					initialValues={{name: group?.name}}
					onSubmit={(data) => console.log(data)}
					innerRef={formRef}
					validation={validation}
				>
					<Label htmlFor={'name'}>사용자 그룹명</Label>
					<TextBox
						name={'name'}
						placeholder={'그룹명을 입력하세요'}
					/>
				</Form>
			</ModalFormContainer>
			<ul>
				<LiText>그룹명 : {group?.name}</LiText>
				<LiText>
					그룹 유형 :{' '}
					{
						groupTypes.find((v) => v.id === group.clientGroupTypeId)
							.name
					}
				</LiText>
				<LiText>생성 일시 : {group?.creationDate}</LiText>
			</ul>

			<ReadOnlyTableSpace>사용자: {userData.length}</ReadOnlyTableSpace>

			<TableContainer
				mode={'readOnly'}
				data={userData}
				tableKey={tableKeys.groups.summary.user}
				columns={tableColumns[tableKeys.groups.summary.user]}
			>
				<Table />
			</TableContainer>

			<ReadOnlyTableSpace>권한: {roleData.length}</ReadOnlyTableSpace>
			<TableContainer
				mode={'readOnly'}
				data={roleData}
				tableKey={tableKeys.groups.summary.permission}
				columns={tableColumns[tableKeys.groups.summary.permission]}
			>
				<Table />
			</TableContainer>

			<ReadOnlyTableSpace>태그: {tagData.length}</ReadOnlyTableSpace>
			<TableContainer
				mode={'readOnly'}
				data={tagData}
				tableKey={tableKeys.groups.summary.tag}
				columns={tableColumns[tableKeys.groups.summary.tag]}
			>
				<Table />
			</TableContainer>
		</>
	);
};

GroupSummary.propTypes = {
	groupId: PropTypes.string.isRequired,
};
export default GroupSummary;
