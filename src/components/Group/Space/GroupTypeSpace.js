import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';

import {
	AppBarButtons,
	IamContainer,
	SubHeader,
} from '../../../styles/components/style';
import {useHistory} from 'react-router-dom';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import Table from '../../Table/Table';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import {
	AppBarLink,
	CurrentPathContainer,
	NextPath,
} from '../../../styles/components/currentPath';
import TableOptionText from '../../Table/Options/TableOptionText';
import TableContainer from '../../Table/TableContainer';

const GroupTypeSpace = () => {
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const [select, setSelect] = useState({});
	const [data, setData] = useState(
		groupTypes.map((v) => ({
			...v,
			numberOfGroups: groups.filter(
				(val) => val.clientGroupTypeId === v.id,
			).length,
		})),
	);

	const onClickAddGroups = useCallback(() => {
		history.push('/groups/add');
	}, [history]);

	const onClickOpenAddGroupTypeDialogBox = useCallback(() => {
		setData([
			...data,
			{
				name: '',
				numberOfGroups: 0,
				description: '',
				creationDate: new Date().toLocaleString(),
			},
		]);
	}, [data]);

	const onClickSaveGroupTypes = useCallback(() => {
		console.log(data);
	}, [data]);

	const onClickDeleteGroupTypes = useCallback(() => {
		console.log(select);
		if (select[0]) {
			setData(data.filter((v) => !select.includes(v.id)));
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [data, select]);

	return (
		<IamContainer>
			<CurrentPathContainer>
				<AppBarLink to='/iam'>IAM</AppBarLink>
				<NextPath>{' > '}</NextPath>
				<AppBarLink to='/groups'>사용자 그룹</AppBarLink>
				<NextPath>{' > '}</NextPath>
				<AppBarLink to='/groups/types'>그룹 유형 관리</AppBarLink>
			</CurrentPathContainer>

			<SubHeader>
				<div>그룹 유형 관리</div>
				<AppBarButtons>
					<NormalButton onClick={onClickOpenAddGroupTypeDialogBox}>
						그룹유형 추가 생성
					</NormalButton>
					<NormalButton onClick={onClickSaveGroupTypes}>
						그룹유형 저장
					</NormalButton>
					<TransparentButton onClick={onClickDeleteGroupTypes}>
						그룹유형 삭제
					</TransparentButton>
					<TransparentButton onClick={onClickAddGroups}>
						취소
					</TransparentButton>
				</AppBarButtons>
			</SubHeader>

			<TableOptionText data={'groupsType'} />
			<TableContainer
				tableKey={tableKeys.groups.type}
				columns={tableColumns[tableKeys.groups.type]}
				data={data}
			>
				<Table setSelect={setSelect} />
			</TableContainer>
		</IamContainer>
	);
};

export default GroupTypeSpace;
