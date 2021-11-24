import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {dummyPolicyOnUser} from '../../../../utils/dummyData';

import TableContainer from '../../../Table/TableContainer';
import Table from '../../../Table/Table';
import {useHistory} from 'react-router-dom';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../styles/components/iam/descriptionPage';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';

const UserSummary = ({userUid, param, setIsOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {user} = useSelector(IAM_USER.selector);
	const [groups, setGroups] = useState([]);
	const onClickChangeTab = useCallback(
		(v) => () => {
			setIsOpened(false);
			history.push({
				pathname: `/${param}/${userUid}`,
				search: `tabs=${v}`,
			});
		},
		[setIsOpened, history, param, userUid],
	);

	const groupData = useMemo(() => {
		return groups
			.filter((v) =>
				user?.groupIds
					? user.groupIds.includes(v.id)
					: [].includes(v.id),
			)
			.map((v) => ({
				...v,
				userGroupType: v.userGroupType.name,
				parentGroup: v.parentGroup.name,
			}));
	}, [groups, user]);

	const roleData = useMemo(() => dummyPolicyOnUser, []);

	const tagData = useMemo(() => {
		return [];
		// return user.tags.map((v, i) => ({
		// 	...v,
		// 	id: v.name,
		// 	numberOfPermissions: v.permissions.length,
		// }));
	}, []);

	useEffect(() => {
		if (user && user.groupIds[0]) {
			console.log(user.groupIds);
			const arr = [];
			user.groupIds.forEach((v) =>
				dispatch(
					IAM_USER_GROUP.asyncAction.findByIdAction({
						id: v,
					}),
				)
					.unwrap()
					.then((res) => {
						arr.push(res);
						if (user.groupIds.length === arr.length) {
							setGroups(arr);
						}
					}),
			);
		}
	}, [dispatch, user]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('group')}>
				그룹 : {groupData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={groupData}
				tableKey={tableKeys.users.summary.group}
				columns={tableColumns[tableKeys.users.summary.group]}
			>
				<Table />
			</TableContainer>

			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				권한 : {roleData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={roleData}
				tableKey={tableKeys.users.summary.permission}
				columns={tableColumns[tableKeys.users.summary.permission]}
			>
				<Table />
			</TableContainer>

			<SummaryTableTitle onClick={onClickChangeTab('tag')}>
				태그 : {tagData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={tagData}
				tableKey={tableKeys.users.summary.tag}
				columns={tableColumns[tableKeys.users.summary.tag]}
			>
				<Table />
			</TableContainer>
		</SummaryTablesContainer>
	);
};

UserSummary.propTypes = {
	userUid: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};
export default UserSummary;
