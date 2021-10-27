import React, {useCallback, useMemo, useState} from 'react';
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
import {
	parentGroupConverter,
	rolesConverter,
} from '../../../utils/tableDataConverter';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';

const GroupSpace = () => {
	const [select, setSelect] = useState([]);
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const data = useMemo(() => {
		return groups.map((v) => ({
			...v,
			roles: rolesConverter(v.roles),
			type: groupTypes.find(
				(val) => val.id === v.clientGroupTypeId,
			).name,
			parentId: parentGroupConverter(v.parentId),
			numberOfUsers: v.members.length,
		}));
	}, [groups, groupTypes]);

	const onCLickLinkToAddGroup = useCallback(() => {
		history.push('/groups/add');
	}, [history]);

	const onClickDeleteGroup = useCallback(() => {
		console.log(select);
		console.log('여기서 api 요청');
	}, [select]);

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
					<TransparentButton onClick={onClickDeleteGroup}>
						삭제
					</TransparentButton>
				</div>
			</SubTitle>
			<Table
				tableKey={tableKeys.groups.basic}
				columns={tableColumns[tableKeys.groups.basic]}
				data={data}
				isSearchFilterable
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				setSelect={setSelect}
			/>
		</IamContainer>
	);
};

export default GroupSpace;
