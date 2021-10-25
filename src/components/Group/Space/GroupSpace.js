import React, {useCallback, useMemo} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import Table from '../../Table/Table';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';

const GroupSpace = () => {
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const data = useMemo(() => {
		return groups.map((v) => ({
			...v,
			clientGroupType: groupTypes.find(
				(val) => val.id === v.clientGroupTypeId,
			).name,
			numberOfUsers: v.members.length,
		}));
	}, [groups, groupTypes]);

	const onCLickLinkToAddGroup = useCallback(() => {
		history.push('/groups/add');
	}, [history]);

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/groups'>사용자 그룹</Link>
			</PathContainer>
			<SubTitle>
				<div>사용자 그룹: {groups.length} </div>
				<div>
					<button onClick={onCLickLinkToAddGroup}>그룹 생성</button>
					<button>삭제</button>
				</div>
			</SubTitle>
			<Table
				tableKey={tableKeys.groups.basic}
				columns={tableColumns[tableKeys.groups.basic]}
				data={data}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isSearchable
			/>
		</IamContainer>
	);
};

export default GroupSpace;
