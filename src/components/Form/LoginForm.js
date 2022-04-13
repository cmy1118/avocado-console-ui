import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import CheckBox from '../RecycleComponents/ReactHookForm/CheckBox';
import AUTH from '../../reducers/api/Auth/auth';
import useModal from '../../hooks/useModal';
import GetUserIdDialogBox from '../DialogBoxs/Form/GetUserIdDialogBox';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import RHF_Textbox from '../RecycleComponents/ReactHookForm/RHF_Textbox';
import * as Yup from 'yup';

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

	const [GetUserIdModal, showGeetUserIdModal] = useModal();

	const getUserIdDialogBoxModalRef = useRef(null);

	const onSubmitLogin = useCallback(
		(data) => {
			console.log(data);

			if (!data.id || !data.password) return;

			dispatch(
				AUTH.asyncAction.userAuthAction({
					username: data.id,
					password: data.password,
					companyId: companyId,
				}),
			);

			if (data.rememberMe.length) {
				localStorage.setItem('rememberMe', true);
				localStorage.setItem('id', data.id);
			} else {
				localStorage.setItem('rememberMe', false);
				localStorage.removeItem('id');
			}
		},
		[dispatch, companyId],
	);

	const onClickGoogleAltAuth = useCallback(() => {
		// localStorage.setItem('companyId', companyId);
		// location.href = Google.location;

		showGeetUserIdModal({
			show: true,
			title: '아이디 입력',
			onSubmitCallback: () =>
				getUserIdDialogBoxModalRef.current.onSubmitUserId(),
			element: <GetUserIdDialogBox ref={getUserIdDialogBoxModalRef} />,
		});
	}, [showGeetUserIdModal]);

	// memo : 주의사항 => 현재 폼에 없는 name값을 입력하시고 require하시면 submit이 정상 동작하지 않습니다.
	const validationSchema = Yup.object()
		.shape({
			id: Yup.string().required('아이디를 입력하세요.'),
			password: Yup.string().required('비밀번호를 입력하세요.'),
		})
		.required();

	const methods = useForm({
		defaultValues: {
			id: '',
			password: '',
			rememberMe: localStorage.getItem('rememberMe'),
		},
		resolver: yupResolver(validationSchema), // 외부 유효성 검사 라이브러리 사용
	});

	return (
		<LogInContainer>
			<LogInTitle>Avocado 로그인</LogInTitle>
			<LogInTitleSpan>
				계정이 없으신가요? <a href={'/signup'}> 회원가입 </a>
			</LogInTitleSpan>
			<FormProvider {...methods}>
				<RowDiv margin={'0px 0px 18px 0px'}>
					<RHF_Textbox
						name={'id'}
						placeholder={'사용자 계정 ID'}
						width={360}
					/>
				</RowDiv>
				<RowDiv margin={'0px 0px 18px 0px'}>
					<RHF_Textbox
						name={'password'}
						type={'password'}
						placeholder={'사용자 비밀번호'}
						width={360}
					/>
				</RowDiv>

				<_CheckBoxContainer>
					<CheckBox
						name={'rememberMe'}
						value={'true'}
						label={'비밀번호 기억하기'}
					/>
					<a href={'/password'}>패스워드 찾기</a>
				</_CheckBoxContainer>

				<_UserSubmitButton
					type='submit'
					onClick={methods.handleSubmit(onSubmitLogin)}
				>
					로그인
				</_UserSubmitButton>
			</FormProvider>

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
			<GetUserIdModal width={400} />
		</LogInContainer>
	);
};

export default LoginForm;
