import React, {useCallback, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

import PropTypes from 'prop-types';
import IAM_USER from '../../../../../../reducers/api/IAM/User/User/user';
import ModalFormContainer from '../../../../../RecycleComponents/ModalFormContainer';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../../../../styles/components/buttons';
import {ColDiv, Label, RowDiv} from '../../../../../../styles/components/style';
import {TableTitle} from '../../../../../../styles/components/table';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {FormProvider, useForm} from 'react-hook-form';
import RHF_Textbox from '../../../../../RecycleComponents/ReactHookForm/RHF_Textbox';

const UserInfoTab = ({user, userUid}) => {
	const dispatch = useDispatch();
	const confirmAuthRef = useRef(null);
	const changePasswordRef = useRef(null);

	const [isIdentificationOpened, setIsIdentificationOpened] = useState(false);
	const [isChangePasswordOpened, setIsChangePasswordOpened] = useState(false);

	const onClickSaveChangedInfo = useCallback((data) => {
		//console.log('api 처리 : ', data);
		setIsChangePasswordOpened(false);
	}, []);

	const onClickOpenIdentificationDialogBox = useCallback(() => {
		setIsIdentificationOpened(true);
	}, []);

	const onClickOkBtn = useCallback(() => {
		setIsChangePasswordOpened(true);
		setIsIdentificationOpened(false);
	}, []);

	const onSubmitChangedUserInfo = useCallback(
		(data) => {
			console.log(data);
			const {name, email, telephone, mobile} = data;
			dispatch(
				IAM_USER.asyncAction.updateAction({
					userUid: userUid,
					name,
					email,
					telephone,
					mobile,
				}),
			);
		},
		[dispatch, userUid],
	);

	const userInfoMethods = useForm({
		defaultValues: {
			id: user?.id,
			name: user?.name,
			password: '*********',
			email: user?.email,
			telephone: user?.telephone,
			mobile: user?.mobile,
		},
	});

	const confirmAuthMethods = useForm();
	const changePasswordMethods = useForm();

	// textbox map으로 돌리기 위해서 생성
	const infos = [
		{name: 'id', label: '사용자 ID'},
		{name: 'name', label: '사용자 이름'},
		{name: 'password', label: '비밀번호'},
		{name: 'email', label: '이메일 주소'},
		{name: 'telephone', label: '전화번호'},
		{name: 'mobile', label: '모바일 전화번호'},
	];

	const changes = [
		{
			name: 'current',
			label: '현재 비밀번호',
			placeholder: '현재 비밀번호를 입력하십시오.',
		},
		{
			name: 'new',
			label: '새로운 비밀번호',
			placeholder: '새로운 비밀번호를 입력하십시오.',
		},
		{
			name: 'confirm',
			label: '비밀번호 확인',
			placeholder: '새로운 비밀번호를 입력하십시오.',
		},
	];

	return (
		<TabContentContainer>
			<TableTitle>
				기본정보
				<NormalButton
					margin='0px 0px 0px 5px'
					onClick={userInfoMethods.handleSubmit(
						onSubmitChangedUserInfo,
					)}
				>
					저장
				</NormalButton>
			</TableTitle>
			<div style={{padding: '10px 10px 0px 30px'}}>
				<FormProvider {...userInfoMethods}>
					{infos.map((v) => {
						return (
							<RowDiv key={v.name} margin={'0px 0px 12px 0px'}>
								<Label htmlFor={v.name}>
									<li>{v.label}</li>
								</Label>
								<RHF_Textbox name={v.name} readOnly />
								{v.name === 'password' && (
									<NormalBorderButton
										type={'button'}
										margin='0px 0px 0px 10px'
										onClick={
											onClickOpenIdentificationDialogBox
										}
									>
										비밀번호 변경
									</NormalBorderButton>
								)}
							</RowDiv>
						);
					})}
				</FormProvider>
			</div>

			<ModalFormContainer
				isOpened={isIdentificationOpened}
				setIsOpened={setIsIdentificationOpened}
				title={'본인 확인'}
				innerRef={confirmAuthRef}
			>
				<FormProvider {...confirmAuthMethods}>
					<Label htmlFor={'email'}>이메일 주소</Label>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<RHF_Textbox
							name={'email'}
							placeholder={'E-mail 주소'}
						/>
						<NormalButton
							type={'button'}
							onClick={() =>
								console.log(
									confirmAuthMethods.getValues('email'),
								)
							}
						>
							인증번호 전송
						</NormalButton>
					</RowDiv>
					<Label htmlFor={'number'}>인증번호</Label>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<RHF_Textbox
							name={'number'}
							placeholder={'인증번호 입력'}
						/>
						<NormalButton
							type={'button'}
							onClick={() =>
								console.log(
									confirmAuthMethods.getValues('number'),
								)
							}
						>
							인증하기
						</NormalButton>
					</RowDiv>
				</FormProvider>
			</ModalFormContainer>

			<ModalFormContainer
				isOpened={isChangePasswordOpened}
				setIsOpened={setIsChangePasswordOpened}
				title={'비밀번호 변경'}
				innerRef={changePasswordRef}
			>
				<FormProvider
					{...changePasswordMethods}
					// memo : onSubmit={onClickSaveChangedInfo}
				>
					{changes.map((v) => {
						return (
							<ColDiv key={v.name} margin={'0px 0px 12px 0px'}>
								<Label>{v.label}</Label>
								<RHF_Textbox
									name={v.name}
									placeholder={v.placeholder}
								/>
							</ColDiv>
						);
					})}
				</FormProvider>
			</ModalFormContainer>
		</TabContentContainer>
	);
};

UserInfoTab.propTypes = {
	userUid: PropTypes.string.isRequired,
	user: PropTypes.object,
};

export default UserInfoTab;
