import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import AddGroup from '../Components/AddGroup';
import TableContainer from '../../Table/TableContainer';

const AddGroupSpace = () => {
	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/group'>사용자 그룹</Link>
				<div>{' > '}</div>
				<Link to='/group/add'>사용자 그룹 생성</Link>
			</PathContainer>
			<AddGroup />
			그룹에 사용자 추가
			<TableContainer tableKey='addUsersToGroup' />
		</IamContainer>
	);
};

export default AddGroupSpace;
