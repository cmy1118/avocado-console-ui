import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';

import Table from '../../../Table/Table';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import * as yup from 'yup';
import {
	dummyDates,
	dummyPolicyOnGroup,
	dummyUsers,
} from '../../../../utils/dummyData';
import TableContainer from '../../../Table/TableContainer';
import {useHistory} from 'react-router-dom';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../styles/components/iam/descriptionPage';

const GroupSummary = ({Id, param, setIsOpened}) => {
	const history = useHistory();
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);

	const group = useMemo(() => groups.find((v) => v.id === Id), [groups, Id]);

	const userData = useMemo(() => {
		return users
			.filter((v) => group.members.includes(v.userUid))
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
			.min(5, '최소 길이는 5자 입니다.')
			.max(40, '최대 길이는 100자 입니다.'),
	};
	const onClickChangeTab = useCallback(
		(v) => () => {
			setIsOpened(false);
			history.push({
				pathname: `/${param}/${Id}`,
				search: `tabs=${v}`,
			});
		},
		[history, setIsOpened, param],
	);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('user')}>
				사용자 : {userData.length}
			</SummaryTableTitle>

			<TableContainer
				mode={'readOnly'}
				data={userData}
				tableKey={tableKeys.groups.summary.user}
				columns={tableColumns[tableKeys.groups.summary.user]}
			>
				<Table />
			</TableContainer>

			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				권한 : {roleData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={roleData}
				tableKey={tableKeys.groups.summary.permission}
				columns={tableColumns[tableKeys.groups.summary.permission]}
			>
				<Table />
			</TableContainer>

			<SummaryTableTitle onClick={onClickChangeTab('tag')}>
				태그 : {tagData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={tagData}
				tableKey={tableKeys.groups.summary.tag}
				columns={tableColumns[tableKeys.groups.summary.tag]}
			>
				<Table />
			</TableContainer>
		</SummaryTablesContainer>
	);
};

GroupSummary.propTypes = {
	Id: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};
export default GroupSummary;
