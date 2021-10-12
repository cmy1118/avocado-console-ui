import React, {useCallback, useState} from 'react';
import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';
import {Link, useHistory} from 'react-router-dom';
import TableContainer from '../../Table/TableContainer';
import AddGroupTypeDialogBox from '../../DialogBoxs/Form/AddGroupTypeDialogBox';

const GroupTypeSpace = () => {
	const history = useHistory();
	const [isAddGroupTypeOpened, setIsAddGroupTypeOpened] = useState(false);

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
					<button onClick={onClickOpenAddGroupTypeDialogBox}>
						그룹유형 추가 생성
					</button>
					<button>그룹유형 저장</button>
					<button>그룹유형 삭제</button>
					<button onClick={onClickAddGroups}>취소</button>
				</div>
			</SubTitle>

			<TableContainer
				tableKey='groupTypes'
				isPageable={true}
				isNumberOfRowsAdjustable={true}
				isColumnFilterable={true}
				isSelectable={true}
			/>
			<AddGroupTypeDialogBox
				isOpened={isAddGroupTypeOpened}
				setIsOpened={setIsAddGroupTypeOpened}
			/>
		</IamContainer>
	);
};

export default GroupTypeSpace;
