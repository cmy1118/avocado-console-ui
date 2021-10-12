import React, {useCallback, useMemo} from 'react';
import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';
import {Link, useHistory} from 'react-router-dom';

import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';

import {getColumnsAsKey} from '../../../utils/TableColumns';
import Table from '../../Table/Table';

const GroupSpace = () => {
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);

	const data = useMemo(() => {
		return groups.map((v) => ({
			...v,
			numberOfUsers: v.members.length,
		}));
	}, [groups]);

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
				tableKey='groups'
				columns={getColumnsAsKey['groups']}
				data={data}
				isPageable={true}
				isNumberOfRowsAdjustable={true}
				isColumnFilterable={true}
				isSortable={true}
				isSelectable={true}
			/>
		</IamContainer>
	);
};

export default GroupSpace;
