import React, {useCallback, useMemo} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import Table from '../../Table/Table';
import {tableKeys} from '../../../utils/data';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import {
	parentGroupConverter,
	rolesConverter,
} from '../../../utils/tableDataConverter';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';

const GroupSpace = () => {
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const data = useMemo(() => {
		return groups.map((v) => ({
			...v,
			roles: rolesConverter(v.roles),
			clientGroupType: groupTypes.find(
				(val) => val.id === v.clientGroupTypeId,
			).name,
			parentId: parentGroupConverter(v.parentId),
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
					<NormalButton onClick={onCLickLinkToAddGroup}>
						그룹 생성
					</NormalButton>
					<TransparentButton>삭제</TransparentButton>
				</div>
			</SubTitle>
			<Table
				tableKey={tableKeys.groups}
				columns={getColumnsAsKey[tableKeys.groups]}
				data={data}
				isSearchFilterable
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
			/>
		</IamContainer>
	);
};

export default GroupSpace;
