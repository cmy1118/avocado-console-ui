import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import AddGroup from '../Components/AddGroup';

const AddGroupSpace = () => {
	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/groups'>사용자 그룹</Link>
				<div>{' > '}</div>
				<Link to='/groups/add'>사용자 그룹 생성</Link>
			</PathContainer>
			<AddGroup />
			그룹에 사용자 추가
			{/*<TableContainer*/}
			{/*	tableKey='usersIncludedInGroupOnAddPage'*/}
			{/*	isPageable={true}*/}
			{/*	isNumberOfRowsAdjustable={true}*/}
			{/*	isColumnFilterable={true}*/}
			{/*	isSortable={true}*/}
			{/*	isDnDPossible={true}*/}
			{/*/>*/}
		</IamContainer>
	);
};

export default AddGroupSpace;
