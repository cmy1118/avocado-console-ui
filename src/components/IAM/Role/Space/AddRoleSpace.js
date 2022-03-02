import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {CurrentPathBar} from '../../../../styles/components/currentPathBar';
import {
	AddPageContainer,
	AddSpaceContainer,
} from '../../../../styles/components/iam/addPage';
import {FOLD_DATA} from '../../../../utils/data';
import ConnectPolicyToRole from '../Components/ConnectPolicyToRole';
import ConnectUserToRole from '../Components/ConnectUserToRole';
import ConnectGroupToRole from '../Components/ConnectGroupToRole';
import AddRole from '../Components/AddRole';
import CurrentPathBarTemp from '../../../Header/CurrentPathBarTemp';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/roles', label: '역할'},
	{url: '/roles/add', label: '역할 추가'},
];

const AddRoleSpace = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);
	const [values, setValues] = useState({
		type: '',
		parentId: '',
		name: '',
	});
	const [groupMembers, setGroupMembers] = useState([]);

	return (
		<AddSpaceContainer>
			<CurrentPathBarTemp paths={paths} />

			<AddPageContainer>
				<AddRole
					setIsOpened={setIsOpened}
					values={values}
					groupMembers={groupMembers}
					setValues={setValues}
				/>

				<ConnectPolicyToRole
					space={'RolePolicyTab'}
					isFold={isTableFold}
					setIsFold={setIsTableFold}
					setValue={setGroupMembers}
				/>
				<ConnectUserToRole
					space={'RoleUserTab'}
					isFold={isTableFold}
					setIsFold={setIsTableFold}
					setValue={setGroupMembers}
				/>
				<ConnectGroupToRole
					space={'RoleGroupTab'}
					isFold={isTableFold}
					setIsFold={setIsTableFold}
					setValue={setGroupMembers}
				/>
			</AddPageContainer>
		</AddSpaceContainer>
	);
};

export default AddRoleSpace;
