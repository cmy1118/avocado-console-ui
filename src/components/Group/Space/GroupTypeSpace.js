import React, {useCallback} from 'react';
import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';
import {Link, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {groupsSelector} from '../../../reducers/groups';
import Table from '../../Table/Table';
import {groupTypeColumns} from '../../../utils/tableColumns';

const GroupTypeSpace = () => {
	const history = useHistory();
	const {groupTypes} = useSelector(groupsSelector.all);

	const onClickAddGroup = useCallback(() => {
		history.push('/group/add');
	}, [history]);

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
					<button>그룹유형 추가 생성</button>
					<button>그룹유형 저장</button>
					<button>그룹유형 삭제</button>
					<button onClick={onClickAddGroup}>취소</button>
				</div>
			</SubTitle>

			<Table tableKey='groupTypes' />
		</IamContainer>
	);
};

export default GroupTypeSpace;
