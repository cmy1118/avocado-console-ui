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
import {Google} from '../../utils/auth';
import AUTH_USER from '../../reducers/api/Auth/authUser';

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

	const formRef = useRef(null);

	const onSubmitLogin = useCallback(
		(v) => {
			if (!v.id || !v.password) return;

			dispatch(
				AUTH_USER.asyncAction.authPolicyVerificationAction({
					username: v.id,
					password: v.password,
					companyId: companyId,
				}),
			)
				.unwrap()
				.then((val) => {
					console.log(val);
					console.log(val?.policyParameter?.policies);
					if (
						val?.policyParameter?.policies[0]?.type ===
						'IdAndPassword'
					) {
						dispatch(
							AUTH_USER.asyncAction.userAuthAction({
								username: v.id,
								password: v.password,
								companyId: companyId,
							}),
						);
					}
				});

			if (rememberMe) {
				localStorage.setItem('rememberMe', true);
				localStorage.setItem('id', v.id);
				localStorage.setItem('password', v.password);
			} else {
				localStorage.setItem('rememberMe', false);
				localStorage.removeItem('id');
				localStorage.removeItem('password');
			}
		},
		[dispatch, companyId, rememberMe],
	);

	const onClickRememberPassword = useCallback(() => {
		setRememberMe(!rememberMe);
	}, [rememberMe]);

	const onClickGoogleAltAuth = useCallback(() => {
		localStorage.setItem('companyId', companyId);
		location.href = Google.location;
	}, []);

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
				<_AlternativeAuthButton>
					<img src={kakaoButton} alt='kakaoButton' />
				</_AlternativeAuthButton>
				<_AlternativeAuthButton>
					<img src={naverButton} alt='naverButton' />
				</_AlternativeAuthButton>
			</_AlternativeAuthContainer>
			<_AlternativeAuthContainer>
				<_AlternativeAuthButton onClick={onClickGoogleAltAuth}>
					<img src={googleButton} alt='googleButton' />
				</_AlternativeAuthButton>
				<_AlternativeAuthButton>
					<img src={appleButton} alt='appleButton' />
				</_AlternativeAuthButton>
			</_AlternativeAuthContainer>
		</LogInContainer>
	);
};

export default LoginForm;
