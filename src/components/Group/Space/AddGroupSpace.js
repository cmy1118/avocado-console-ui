import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import AddGroup from '../Components/AddGroup';
import AssignRoleToGroup from '../Components/AssignRoleToGroup';
import AddTagToGroup from '../Components/AddTagToGroup';

const AddGroupSpace = () => {
	const [addedRoles, setAddedRoles] = useState([]);

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

			<AssignRoleToGroup
				addedRoles={addedRoles}
				setAddedRoles={setAddedRoles}
			/>

			<AddTagToGroup />
		</IamContainer>
	);
};

export default AddGroupSpace;
