import React, {useState} from 'react';
import {
	AddPageContainer,
	AddSpaceContainer,
} from '../../../../styles/components/iam/addPage';
import {FOLD_DATA} from '../../../../utils/data';
import ConnectPolicyToRole from '../Components/Add/ConnectPolicyToRole';
import ConnectUserToRole from '../Components/Add/ConnectUserToRole';
import ConnectGroupToRole from '../Components/Add/ConnectGroupToRole';
import AddRole from '../Components/Add/AddRole';
import CurrentPathBar from '../../../Header/CurrentPathBar';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/roles', label: '역할'},
	{url: '/roles/add', label: '역할 추가'},
];

const AddRoleSpace = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	const [usage , setUsage] = useState('restrict');
	const [maxGrants , setMaxGrants] = useState(0);
	const [values, setValues] = useState({
		type: '',
		parentId: '',
		name: '',
	});
	const [groupMembers, setGroupMembers] = useState([]);

	return (
		<CreateSpaceContainer>
			<CurrentPathBar paths={paths} />

			<IamSectionContents>
				<AddRole
					setIsOpened={setIsOpened}
					setUsage = {setUsage}
					setMaxGrants = {setMaxGrants}
				/>

				<ConnectPolicyToRole space={'ConnectPolicyToRole'}
									 setValue={setGroupMembers}/>

				<ConnectUserToRole space={'ConnectUserToRole'}
								   usage = {usage}
								   maxGrants = {maxGrants}
								   setValue={setGroupMembers}
				/>

				<ConnectGroupToRole space={'ConnectGroupToRole'}
									usage = {usage}
									maxGrants = {maxGrants}
									setValue={setGroupMembers}
				/>
			</IamSectionContents>
		</CreateSpaceContainer>
	);
};

export default AddRoleSpace;
