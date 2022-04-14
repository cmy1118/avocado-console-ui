import React from 'react';
import {
	IamContainer,
	IamContents,
	TitleBar,
} from '../../../../styles/components/iam/iam';
import CreatePolicy from '../Components/Create/CreatePolicy';
import {IamSectionContents} from '../../../../styles/components/iam/addPage';
import CurrentPathBar from '../../../Header/CurrentPathBar';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/policies', label: '정책'},
	{url: '/policies/add', label: '정책 추가'},
];

/**************************************************
 * ambacc244 - 새로운 정책을 추가를 위한 정보를 조합하는 컴포넌트
 **************************************************/
const CreatePolicySpace = () => {
	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />
			<TitleBar>정책 생성</TitleBar>

			<IamContents>
				<CreatePolicy />
			</IamContents>
		</IamContainer>
	);
};

export default CreatePolicySpace;
