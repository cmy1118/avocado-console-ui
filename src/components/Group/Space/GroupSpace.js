import React, {useCallback} from 'react';
import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';
import {Link, useHistory} from 'react-router-dom';
import TableContainer from '../../Table/TableContainer';
import {useSelector} from 'react-redux';
import {groupsSelector} from '../../../reducers/groups';

const GroupSpace = () => {
	const history = useHistory();
	const {groups} = useSelector(groupsSelector.all);

	const onCLickLinkToAddGroup = useCallback(() => {
		history.push('/group/add');
	}, [history]);

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/group'>사용자 그룹</Link>
			</PathContainer>
			<SubTitle>
				<div>사용자 그룹: {groups.length} </div>
				<div>
					<button onClick={onCLickLinkToAddGroup}>그룹 생성</button>
					<button>삭제</button>
				</div>
			</SubTitle>
			{/*/*******************************************************/}
			{/*  roberto : Table_update 선택기능추가                      */}
			{/*  접근관리 설정에따른  TableContainer 컴포넌트                 */}
			{/*/*******************************************************/}
			{/*<Table tableKey='users' />*/}
			<TableContainer tableKey='groups' />

			{/*/*******************************************************/}
		</IamContainer>
	);
};

export default GroupSpace;
