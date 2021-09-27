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

	const onClickAddGroup = useCallback(() => {
		history.push('/group/add');
	}, [history]);

	const onClickOpenAddGroupTypeDialogBox = useCallback(() => {
		setIsAddGroupTypeOpened(true);
	}, []);

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/group'>사용자 그룹</Link>
				<div>{' > '}</div>
				<Link to='/group/type'>그룹 유형 관리</Link>
			</PathContainer>

			<SubTitle>
				<div>그룹 유형 관리</div>
				<div>
					<button onClick={onClickOpenAddGroupTypeDialogBox}>
						그룹유형 추가 생성
					</button>
					<button>그룹유형 저장</button>
					<button>그룹유형 삭제</button>
					<button onClick={onClickAddGroup}>취소</button>
				</div>
			</SubTitle>

			<TableContainer tableKey='groupTypes' />
			<AddGroupTypeDialogBox
				isOpened={isAddGroupTypeOpened}
				setIsOpened={setIsAddGroupTypeOpened}
			/>
		</IamContainer>
	);
};

export default GroupTypeSpace;
