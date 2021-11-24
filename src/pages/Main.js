import React, {useCallback} from 'react';
import {account} from '../utils/auth';
import kt from '../images/backgound/workplace-2@2x.png';
import samsung from '../images/backgound/workplce@2x.png';
import img from '../images/dashboard/service_app_gray@2x.png';
import {useSelector} from 'react-redux';
import AUTH_USER from '../reducers/api/Auth/authUser';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import ContentsButton from '../components/Dasnboard/contentsButton';
import {status} from '../utils/data';
//img
import IAM_green from '../images/dashboard/service_iam_green@2x.png';
import PAM_green from '../images/dashboard/service_pam_green@2x.png';
import Approal_green from '../images/dashboard/service_app_green@2x.png';

// import Approal_green from '../images/dashboard/service_app_green@2x.png';
// import Approal_green from '../images/dashboard/service_app_green@2x.png';
// import Approal_green from '../images/dashboard/service_app_green@2x.png';

const utils = [
	{title: 'IAM', text: '신원 및 접근 관리', img: IAM_green},
	{title: 'PAM', text: '특권 접근 관리', img: PAM_green},
];
const favorite = [
	{title: 'IAM', text: '신원 및 접근 관리', img: IAM_green},
	{title: 'PAM', text: '특권 접근 관리', img: PAM_green},
	{title: 'Approal', text: '승인 워크플로우 관리', img: Approal_green},
];
const service = [
	{title: 'IAM', text: '신원 및 접근 관리', img: IAM_green},
	{title: 'PAM', text: '특권 접근 관리', img: PAM_green},
	{title: 'Approal', text: '승인 워크플로우 관리', img: Approal_green},
	{title: 'Approal', text: '승인 워크플로우 관리', img: Approal_green},
	{title: 'Approal', text: '승인 워크플로우 관리', img: Approal_green},
];

// const _Container = styled.div`
// 	display: grid;
// 	height: 100%;
// 	background: #f8f9fa;
// 	display: flex;
// 	align-items: start;
// 	justify-content: center;
// 	overflow: hidden;
// `;
const _Container = styled.div`
	display: grid;
	height: 955px;
	grid-template-rows: 100%;
	grid-template-columns: 10% 80% 10%;
	height: 100%;
	background: #f8f9fa;
	width: 100%;
	grid-auto-rows: 40px;

	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;

// const _ImageContainer = styled.div`
// 	background: #f8f9fa;
// 	max-width: 1500px;
// 	height: 100%;
// 	display: flex;
// 	justify-content: center;
// 	align-items: start;
//
// 	img {
// 		object-fit: contain;
// 		width: 100%;
// 		image-rendering: -moz-crisp-edges;
// 		mage-rendering: -o-crisp-edges;
// 		image-rendering: -webkit-optimize-contrast;
// 		-ms-interpolation-mode: nearest-neighbor;
// 		image-rendering: crisp-edges;
// 	}
// `;

const _contentsContainer = styled.div`
	padding: 55px 0px;
	// display: flex;
	// align-items: start;
	// justify-content: center;
	// overflow: hidden;
	width: 100%;
	height: 100%;
`;

const _contents = styled.div`
	display: flex;
	width: 100%;
	height: 300px;
`;
const _side = styled.div``;

const Main = () => {
	const history = useHistory();
	const {companyId} = useSelector(AUTH_USER.selector);

	const onClickMove = useCallback(() => {
		history.push('/iam');
	}, [history]);

	return (
		// <_Container>
		// 	{/*{companyId === account.KT.companyId && (*/}
		// 	<_ImageContainer>
		// 		<img src={kt} onClick={onClickMove} />
		// 	</_ImageContainer>
		// 	{/*)}*/}
		// 	{companyId === account.SAMSUNG.companyId && (
		// 		<_ImageContainer>
		// 			<img src={samsung} onClick={onClickMove} />
		// 		</_ImageContainer>
		// 	)}
		// </_Container>

		<_Container>
			<_side></_side>
			<_contentsContainer>
				<_contents>
					{favorite.map((v, index) => {
						return (
							<ContentsButton
								img={v.img}
								title={v.title}
								text={v.text}
								key={index}
							/>
						);
					})}
				</_contents>
				<_contents></_contents>
				<_contents></_contents>
				<_contents></_contents>
			</_contentsContainer>
			<_side></_side>
		</_Container>
	);
};

export default Main;
