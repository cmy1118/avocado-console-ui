import React, {useCallback, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';

import appleButton from '../../images/auth/apple_btn.png';
import googleButton from '../../images/auth/google_btn.png';
import naverButton from '../../images/auth/naver_btn.png';
import kakaoButton from '../../images/auth/kakao_btn.png';

import {
	LogInButton,
	LogInContainer,
	LogInTitle,
	LogInTitleSpan,
} from '../../styles/components/login';
import Form from '../RecycleComponents/New/Form';
import TextBox from '../RecycleComponents/New/TextBox';
import {RowDiv} from '../../styles/components/style';
import CheckBox from '../RecycleComponents/New/CheckBox';
import AUTH from '../../reducers/api/Auth/auth';
import useModal from '../../hooks/useModal';
import GetUserIdDialogBox from '../DialogBoxs/Form/GetUserIdDialogBox';
import {altAuthType} from '../../utils/auth';

const _CheckBoxContainer = styled.div`
	display: flex;
	width: 360px;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	margin: 18px 0px 42px;
	a {
		color: #757575;
		text-decoration: underline;
	}
`;

const _UserSubmitButton = styled(LogInButton)`
	margin: 42px 0;
`;

const _DividingLine = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 18px;
	color: #757575;
`;

const _DividingLineMessage = styled.hr`
	width: 158px;
	color: #757575;
`;

const _AlternativeAuthContainer = styled.div`
	margin: 8px 0px;
	display: flex;
	justify-content: space-between;
`;

const _AlternativeAuthButton = styled.button`
	background: transparent;
	border: none;
	width: fit-content;
	padding: 0px;
`;

const LoginForm = () => {
	const dispatch = useDispatch();
	const {companyId} = useParams();

	const [rememberMe, setRememberMe] = useState(
		localStorage.getItem('rememberMe'),
	);

	const [GetUserIdModal, showGeetUserIdModal] = useModal();

	const formRef = useRef(null);
	const getUserIdDialogBoxModalRef = useRef(null);

	const onSubmitLogin = useCallback(
		(v) => {
			if (!v.id || !v.password) return;

			localStorage.setItem('companyId', companyId);

			dispatch(
				AUTH.asyncAction.userAuthAction({
					username: v.id,
					password: v.password,
					companyId: companyId,
				}),
			);

			if (rememberMe) {
				localStorage.setItem('rememberMe', true);
				localStorage.setItem('id', v.id);
			} else {
				localStorage.setItem('rememberMe', false);
				localStorage.removeItem('id');
			}
		},
		[dispatch, companyId, rememberMe],
	);

	const onClickRememberPassword = useCallback(() => {
		setRememberMe(!rememberMe);
	}, [rememberMe]);

	const onClickAltAuth = useCallback(
		(v) => () => {
			localStorage.setItem('companyId', companyId);

			showGeetUserIdModal({
				show: true,
				title: '아이디 입력',
				onSubmitCallback: () =>
					getUserIdDialogBoxModalRef.current.onSubmitUserId(),
				element: (
					<GetUserIdDialogBox
						ref={getUserIdDialogBoxModalRef}
						type={v}
					/>
				),
			});
		},
		[],
	);

	return (
		<LogInContainer>
			<LogInTitle>Avocado 로그인</LogInTitle>
			<LogInTitleSpan>
				계정이 없으신가요? <a href={'/signup'}> 회원가입 </a>
			</LogInTitleSpan>
			<Form
				initialValues={{
					id: rememberMe ? localStorage.getItem('id') : '',
					password: rememberMe
						? localStorage.getItem('password')
						: '',
				}}
				onSubmit={onSubmitLogin}
				innerRef={formRef}
			>
				<RowDiv margin={'0px 0px 18px 0px'}>
					<TextBox
						name={'id'}
						placeholder={'사용자 계정 ID'}
						direction={'row'}
						width={'360px'}
					/>
				</RowDiv>
				<RowDiv margin={'0px 0px 18px 0px'}>
					<TextBox
						name={'password'}
						placeholder={'사용자 비밀번호'}
						direction={'row'}
						width={'360px'}
						type={'password'}
					/>
				</RowDiv>

				<_CheckBoxContainer>
					<CheckBox
						onClick={onClickRememberPassword}
						label={'비밀번호 기억하기'}
						checked={rememberMe === 'true'}
						onChange={() =>
							setRememberMe(
								rememberMe === 'true' ? 'true' : 'false',
							)
						}
					/>
					<a href={'/password'}>패스워드 찾기</a>
				</_CheckBoxContainer>

				<_UserSubmitButton type='submit' onClick={onSubmitLogin}>
					로그인
				</_UserSubmitButton>
			</Form>

			<_DividingLine>
				<_DividingLineMessage /> 또는 <_DividingLineMessage />
			</_DividingLine>

			<_AlternativeAuthContainer>
				<_AlternativeAuthButton
					onClick={onClickAltAuth(altAuthType.kakao)}
				>
					<img src={kakaoButton} alt='kakaoButton' />
				</_AlternativeAuthButton>
				<_AlternativeAuthButton
					onClick={onClickAltAuth(altAuthType.naver)}
				>
					<img src={naverButton} alt='naverButton' />
				</_AlternativeAuthButton>
			</_AlternativeAuthContainer>
			<_AlternativeAuthContainer>
				<_AlternativeAuthButton
					onClick={onClickAltAuth(altAuthType.google)}
				>
					<img src={googleButton} alt='googleButton' />
				</_AlternativeAuthButton>
				<_AlternativeAuthButton>
					<img src={appleButton} alt='appleButton' />
				</_AlternativeAuthButton>
			</_AlternativeAuthContainer>
			<GetUserIdModal width={400} />
		</LogInContainer>
	);
};

export default LoginForm;
