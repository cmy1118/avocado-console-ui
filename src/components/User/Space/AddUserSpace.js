import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {IamContainer, PathContainer} from '../../../styles/components/style';

import AddTagToUser from '../Components/AddTagToUser';
import AssignRoleToUser from '../Components/AssignRoleToUser';
import AddUserToGroup from '../Components/AddUserToGroup';
import AddUser from '../Components/AddUser';
import ReadOnly from '../Components/ReadOnly';

const AddUserSpace = () => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/users'>사용자</Link>
				<div>{' > '}</div>
				<Link to='/users/add'>사용자 추가</Link>
			</PathContainer>
			<AddUser setIsOpened={setIsOpened} />
			<AddUserToGroup />
			<AssignRoleToUser />
			<AddTagToUser />
			<ReadOnly isOpened={isOpened} setIsOpened={setIsOpened} />
		</IamContainer>
	);
};

export default AddUserSpace;
