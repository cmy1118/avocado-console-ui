import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import appleButton from '../../images/auth/apple_btn.png';
import googleButton from '../../images/auth/google_btn.png';
import naverButton from '../../images/auth/naver_btn.png';
import kakaoButton from '../../images/auth/kakao_btn.png';

import {useHistory, useParams} from 'react-router-dom';
import USER from '../../reducers/api/Auth/user';

import {
	SignInContainer,
	UserSubmitButton,
	UserTitle,
	UserTitleSpan,
} from '../../styles/components/login';
import Form from '../RecycleComponents/New/Form';
import TextBox from '../RecycleComponents/New/TextBox';
import {RowDiv} from '../../styles/components/div';
import CheckBox from '../RecycleComponents/New/CheckBox';

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

const _UserSubmitButton = styled(UserSubmitButton)`
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
	const history = useHistory();
	const {companyId} = useParams();
	const {user} = useSelector(USER.selector);
	const [rememberMe, setRememberMe] = useState(false);

	const formRef = useRef(null);

	const onSubmitLogin = useCallback(
		(v) => {
			dispatch(
				USER.asyncAction.loginAction({
					username: v.id,
					password: v.password,
					companyId: companyId,
				}),
			);
		},
		[dispatch, companyId],
	);

	useEffect(() => {
		if (user) {
			history.push('/');
		}
	}, [history, user]);

	return (
		<SignInContainer>
			<UserTitle>Avocado 로그인</UserTitle>
			<UserTitleSpan>
				계정이 없으신가요? <a href={'/signup'}> 회원가입 </a>
			</UserTitleSpan>
			<Form
				initialValues={{
					id: '',
					password: '',
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
					/>
				</RowDiv>

				<_CheckBoxContainer>
					<CheckBox
						label={'비밀번호 기억하기'}
						checked={rememberMe}
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
				<_AlternativeAuthButton>
					<img src={googleButton} alt='googleButton' />
				</_AlternativeAuthButton>
				<_AlternativeAuthButton>
					<img src={appleButton} alt='appleButton' />
				</_AlternativeAuthButton>
			</_AlternativeAuthContainer>
		</SignInContainer>
	);
};

export default LoginForm;
