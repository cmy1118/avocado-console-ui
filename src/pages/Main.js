import Approal_grey from '../images/dashboard/service_app_gray@2x.png';
import {useSelector} from 'react-redux';
import AUTH from '../reducers/api/Auth/auth';

import React, {useCallback} from 'react';

import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import ContentsButton from '../components/Dasnboard/contentsButton';

//img
import IAM_green from '../images/dashboard/service_iam_green@2x.png';
import PAM_green from '../images/dashboard/service_pam_green@2x.png';
import Approal_green from '../images/dashboard/service_app_green@2x.png';
import RRM_green from '../images/dashboard/service_rrm_green@2x.png';

import IAM_grey from '../images/dashboard/service_iam_gray@2x.png';
import PAM_grey from '../images/dashboard/service_pam_gray@2x.png';

import IAM_red from '../images/dashboard/service_iam_red@2x.png';
import PAM_red from '../images/dashboard/service_pam_red@2x.png';
import Approal_red from '../images/dashboard/service_app_red@2x.png';
import RRM_red from '../images/dashboard/service_rrm_red@2x.png';
import {device} from '../styles/responsive/settings';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	// place-items: center;
	// height: 955px;
	// grid-template-rows: 100%;
	// grid-template-columns: 15% 80% 15%;
	height: 100%;
	background: #f8f9fa;
	// width: 100%;
	width: 1500px
	margin: 0 auto;
	// grid-auto-rows: 40px;

	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;

// ************************** 이미지를 삽입 했을때 [s]**************************
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
// ************************** 이미지를 삽입 했을때 [e]**************************

const _contentsContainer = styled.div`
	padding: 55px 0px;
	height: 100%;
	margin: 0 auto;
	// @media ${device.laptopL} {
	// 	width: 100%;
	// }
`;

const _contents = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 300px;
`;
const _contentsTitle = styled.div`
	font-family: NotoSansCJKKR;
	font-size: 16px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.25;
	letter-spacing: 0.25px;
	text-align: left;
	color: #212121;
	padding-left: 15px;
	margin-bottom: 10px;
`;
const _contentsItem = styled.div`
	display: flex;
`;

const Main = () => {
	const history = useHistory();
	const {companyId} = useSelector(AUTH.selector);
	const utils = [
		{
			title: 'IAM',
			text: '신원 및 접근 관리',
			img: IAM_green,
			url: 'iam'
		},

		{
			title: 'Bastion',
			text: '서버 보안 접근',
			img: PAM_green,
			href: 'ssh://'
		},

		{
			title: '장비 접속',
			text: '장비 접속',
			img: PAM_green,
			href: 'telnet://'
		},

		{
			title: 'Web Terminal ',
			text: '웹터미널',
			img: Approal_green,
			href: `http://ec2-3-36-98-38.ap-northeast-2.compute.amazonaws.com:3002/webterm/login/${companyId}`
		},

		// {
		// 	title: 'Approal',
		// 	text: '승인 워크플로우 관리',
		// 	img: Approal_green,
		// 	url: 'iam',
		// },

		{
			title: 'RRM',
			text: '원격 자원 관리',
			img: RRM_green,
			url: 'iam'
		},

		{
			title: 'PAM',
			text: '특권 접근 관리',
			img: PAM_green,
			url: 'iam'
		}
	];
	const favorite = [
		{title: 'IAM', text: '신원 및 접근 관리', img: IAM_grey, url: 'iam'},
		{title: 'PAM', text: '특권 접근 관리', img: PAM_grey, url: 'iam'},
		{
			title: 'Approal',
			text: '승인 워크플로우 관리',
			img: Approal_grey,
			url: 'iam',
		},
		// {title: 'RRM', text: '원격 자원 관리', img: RRM_grey, url: 'iam'},
	];
	const service = [
		{title: 'IAM', text: '신원 및 접근 관리', img: IAM_red, url: 'iam'},
		{title: 'PAM', text: '특권 접근 관리', img: PAM_red, url: 'iam'},
		{title: 'RRM', text: '원격 자원 관리', img: RRM_red, url: 'iam'},
		{
			title: 'Approal',
			text: '승인 워크플로우 관리',
			img: Approal_red,
			url: 'iam',
		},
		{
			title: 'Bastion',
			text: '서버 보안 접근',
			img: PAM_red,
			href: 'ssh://',
		},
	];
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
			<_contentsContainer>
				<_contents>
					<_contentsTitle>Avocado 기능</_contentsTitle>
					<_contentsItem>
						{utils.map((v, index) => {
							return (
								<ContentsButton
									url={v.url}
									href={v.href}
									img={v.img}
									title={v.title}
									text={v.text}
									key={index}
								/>
							);
						})}
					</_contentsItem>
				</_contents>

				<_contents>
					<_contentsTitle>즐겨찾기</_contentsTitle>
					<_contentsItem>
						{favorite.map((v, index) => {
							return (
								<ContentsButton
									url={v.url}
									href={v.href}
									img={v.img}
									title={v.title}
									text={v.text}
									key={index}
								/>
							);
						})}
					</_contentsItem>
				</_contents>

				<_contents>
					<_contentsTitle>모든 서비스</_contentsTitle>
					<_contentsItem>
						{service.map((v, index) => {
							return (
								<ContentsButton
									url={v.url}
									href={v.href}
									img={v.img}
									title={v.title}
									text={v.text}
									key={index}
								/>
							);
						})}
					</_contentsItem>
				</_contents>
			</_contentsContainer>
		</_Container>
	);
};

export default Main;
