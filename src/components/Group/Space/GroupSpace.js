import React, {useCallback, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {
	AppBarButtons,
	IamContainer,
	SubHeader,
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
import {
	AppBarLink,
	CurrentPathContainer,
	NextPath,
} from '../../../styles/components/currentPath';
import TableContainer from '../../Table/TableContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';

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
			<CurrentPathContainer>
				<AppBarLink to='/iam'>IAM</AppBarLink>
				<NextPath>{' > '}</NextPath>
				<AppBarLink to='/groups'>사용자 그룹</AppBarLink>
			</CurrentPathContainer>

			<SubHeader>
				<div>사용자 그룹 : {groups.length} </div>
				<AppBarButtons>
					<NormalButton onClick={onCLickLinkToAddGroup}>
						그룹 생성
					</NormalButton>
					<TransparentButton
						margin={'0px 0px 0px 5px'}
						onClick={onClickDeleteGroup}
					>
						삭제
					</TransparentButton>
				</AppBarButtons>
			</SubHeader>

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
