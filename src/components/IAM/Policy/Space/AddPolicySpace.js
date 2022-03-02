import React from 'react';
import {Link} from 'react-router-dom';
import {CurrentPathBar} from '../../../../styles/components/currentPathBar';
import {IamContainer} from '../../../../styles/components/iam/iam';
import AddPolicy from '../Components/AddPolicy';
import {AddPageContainer} from '../../../../styles/components/iam/addPage';
import CurrentPathBarTemp from '../../../Header/CurrentPathBarTemp';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/policies', label: '정책'},
	{url: '/policies/add', label: '정책 추가'},
];

/**************************************************
 * ambacc244 - 새로운 정책을 추가를 위한 정보를 조합하는 컴포넌트
 **************************************************/
const AddPolicySpace = () => {
	return (
		<IamContainer>
			<CurrentPathBarTemp paths={paths} />

			<AddPageContainer>
				<AddPolicy />
			</AddPageContainer>
		</IamContainer>
	);
};

export default AddPolicySpace;
