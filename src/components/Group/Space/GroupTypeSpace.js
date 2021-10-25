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
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';

const GroupTypeSpace = () => {
	const history = useHistory();
	const [isAddGroupTypeOpened, setIsAddGroupTypeOpened] = useState(false);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const data = useMemo(() => {
		return groupTypes.map((v) => ({
			...v,
			numberOfGroups: groups.filter(
				(val) => val.clientGroupTypeId === v.id,
			).length,
		}));
	}, [groupTypes, groups]);

	const onClickAddGroups = useCallback(() => {
		history.push('/groups/add');
	}, [history]);

	const onClickOpenAddGroupTypeDialogBox = useCallback(() => {
		setIsAddGroupTypeOpened(true);
	}, []);

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
					<NormalButton onClick={onClickOpenAddGroupTypeDialogBox}>
						그룹유형 추가 생성
					</NormalButton>
					<NormalButton>그룹유형 저장</NormalButton>
					<TransparentButton>그룹유형 삭제</TransparentButton>
					<TransparentButton onClick={onClickAddGroups}>
						취소
					</TransparentButton>
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
			/>
			<AddGroupTypeDialogBox
				isOpened={isAddGroupTypeOpened}
				setIsOpened={setIsAddGroupTypeOpened}
			/>
		</IamContainer>
	);
};

export default GroupTypeSpace;
