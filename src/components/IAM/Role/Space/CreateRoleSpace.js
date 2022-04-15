import React, {useState} from 'react';
import {IamContainer, IamContents, TitleBar} from '../../../../styles/components/iam/iam';
import RolePreviewDialogBox from "../../../DialogBoxs/Preview/RolePreviewDialogBox";

import AddRole from '../Components/Create/AddRole';
import ConnectPolicyToRole from '../Components/Create/ConnectPolicyToRole';
import ConnectUserToRole from '../Components/Create/ConnectUserToRole';
import ConnectGroupToRole from '../Components/Create/ConnectGroupToRole';

import CurrentPathBar from '../../../Header/CurrentPathBar';


const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/roles', label: '역할'},
	{url: '/roles/add', label: '역할 추가'},
];

const CreateRoleSpace = () => {
	const [isOpened, setIsOpened] = useState(false);

	const [usage, setUsage] = useState('restrict');
	const [maxGrants, setMaxGrants] = useState(0);
	const [values, setValues] = useState({
		type: '',
		parentId: '',
		name: '',
	});
	const [groupMembers, setGroupMembers] = useState([]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />
			<TitleBar>역할 생성</TitleBar>

			<IamContents>
				<AddRole setIsOpened={setIsOpened} setUsage={setUsage} setMaxGrants={setMaxGrants}/>
				<ConnectPolicyToRole space={'ConnectPolicyToRole'} setValue={setGroupMembers}/>
				<ConnectUserToRole space={'ConnectUserToRole'} usage={usage} maxGrants={maxGrants} setValue={setGroupMembers}/>
				<ConnectGroupToRole space={'ConnectGroupToRole'} usage={usage} maxGrants={maxGrants} setValue={setGroupMembers}/>
				<RolePreviewDialogBox
					isOpened={isOpened}
					setIsOpened={setIsOpened}
				/>
			</IamContents>

		</IamContainer>

	);
};

export default CreateRoleSpace;
