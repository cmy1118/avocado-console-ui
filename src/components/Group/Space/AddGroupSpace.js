import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import AddGroup from '../Components/AddGroup';
import {useSelector} from 'react-redux';
import {groupsSelector} from '../../../reducers/groups';

const AddGroupSpace = () => {
	/***********************************************************************
	 * roberto: userGroup_update
	 *
	 ***********************************************************************/

	/***********************************************************************/

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
		</IamContainer>
	);
};

export default AddGroupSpace;
