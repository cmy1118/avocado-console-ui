import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import AddGroup from '../Components/AddGroup';
import AssignRoleToGroup from '../Components/AssignRoleToGroup';
import AddTagToGroup from '../Components/AddTagToGroup';
import UsersIncludedInGroup from '../Components/UsersIncludedInGroup';
import ReadOnly from '../Components/ReadOnly';

const AddGroupSpace = () => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/groups'>사용자 그룹</Link>
				<div>{' > '}</div>
				<Link to='/groups/add'>사용자 그룹 생성</Link>
			</PathContainer>
			<AddGroup setIsOpened={setIsOpened} />
			<UsersIncludedInGroup />
			<AssignRoleToGroup />
			<AddTagToGroup />
			<ReadOnly isOpened={isOpened} setIsOpened={setIsOpened} />
		</IamContainer>
	);
};

export default AddGroupSpace;
