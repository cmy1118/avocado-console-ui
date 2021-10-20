import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {IamContainer, PathContainer} from '../../../styles/components/style';

import AddTagToUser from '../Components/AddTagToUser';
import AssignRoleToUser from '../Components/AssignRoleToUser';
import AddUserToGroup from '../Components/AddUserToGroup';
import AddUser from '../Components/AddUser';

const AddUserSpace = () => {
	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/users'>사용자</Link>
				<div>{' > '}</div>
				<Link to='/users/add'>사용자 추가</Link>
			</PathContainer>

			<AddUser />

			<AddUserToGroup />

			<AssignRoleToUser />

			<AddTagToUser />
		</IamContainer>
	);
};

export default AddUserSpace;
