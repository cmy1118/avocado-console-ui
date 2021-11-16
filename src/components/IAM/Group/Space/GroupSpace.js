import React, {useCallback, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import Table from '../../../Table/Table';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	parentGroupConverter,
	rolesConverter,
} from '../../../../utils/tableDataConverter';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {
	CurrentPathBarLink,
	CurrentPathBar,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import TableContainer from '../../../Table/TableContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';

const GroupSpace = () => {
	const [select, setSelect] = useState({});
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const data = useMemo(() => {
		return groups.map((v) => ({
			...v,
			roles: rolesConverter(v.roles),
			type: groupTypes.find((val) => val.id === v.clientGroupTypeId).name,

			numberOfUsers: v.members.length,
			parentGroup: parentGroupConverter(
				groups.find((val) => val.id === v.parentId)?.name,
			),
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
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/groups'>
					사용자 그룹
				</CurrentPathBarLink>
			</CurrentPathBar>

			<TitleBar>
				<div>사용자 그룹 : {groups.length} </div>
				<TitleBarButtons>
					<NormalButton onClick={onCLickLinkToAddGroup}>
						그룹 생성
					</NormalButton>
					<TransparentButton
						margin={'0px 0px 0px 5px'}
						onClick={onClickDeleteGroup}
					>
						삭제
					</TransparentButton>
				</TitleBarButtons>
			</TitleBar>

			<TableContainer
				tableKey={tableKeys.groups.basic}
				columns={tableColumns[tableKeys.groups.basic]}
				data={data}
			>
				<TableOptionsBar isSearchFilterable />
				<Table setSelect={setSelect} />
			</TableContainer>
		</IamContainer>
	);
};

export default GroupSpace;