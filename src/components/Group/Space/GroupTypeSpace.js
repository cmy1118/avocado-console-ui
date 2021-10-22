import React, {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';
import {Link, useHistory} from 'react-router-dom';
import AddGroupTypeDialogBox from '../../DialogBoxs/Form/AddGroupTypeDialogBox';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import {tableKeys} from '../../../utils/data';
import Table from '../../Table/Table';

const GroupTypeSpace = () => {
	const history = useHistory();
	const [isAddGroupTypeOpened, setIsAddGroupTypeOpened] = useState(false);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const [select, setSelect] = useState([]);
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
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/groups'>사용자 그룹</Link>
				<div>{' > '}</div>
				<Link to='/groups/types'>그룹 유형 관리</Link>
			</PathContainer>

			<SubTitle>
				<div>그룹 유형 관리</div>
				<div>
					<button onClick={onClickOpenAddGroupTypeDialogBox}>
						그룹유형 추가 생성
					</button>
					<button onClick={onClickSaveGroupTypes}>
						그룹유형 저장
					</button>
					<button onClick={onClickDeleteGroupTypes}>
						그룹유형 삭제
					</button>
					<button onClick={onClickAddGroups}>취소</button>
				</div>
			</SubTitle>

			<Table
				tableKey={tableKeys.groupTypes}
				columns={getColumnsAsKey[tableKeys.groupTypes]}
				data={data}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSelectable
				setData={setData}
				setSelect={setSelect}
			/>
			<AddGroupTypeDialogBox
				isOpened={isAddGroupTypeOpened}
				setIsOpened={setIsAddGroupTypeOpened}
			/>
		</IamContainer>
	);
};

export default GroupTypeSpace;
