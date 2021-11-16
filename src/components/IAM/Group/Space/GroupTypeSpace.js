import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';

import {useHistory} from 'react-router-dom';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import Table from '../../../Table/Table';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {
	CurrentPathBarLink,
	CurrentPathBar,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableContainer from '../../../Table/TableContainer';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';

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
		if (select[tableKeys.groups.type][0]) {
			console.log('api 처리', select[tableKeys.groups.type]);
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [select]);

	return (
		<IamContainer>
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/groups'>
					사용자 그룹
				</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/groups/types'>
					그룹 유형 관리
				</CurrentPathBarLink>
			</CurrentPathBar>

			<TitleBar>
				<div>그룹 유형 관리</div>
				<TitleBarButtons>
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
				</TitleBarButtons>
			</TitleBar>

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
