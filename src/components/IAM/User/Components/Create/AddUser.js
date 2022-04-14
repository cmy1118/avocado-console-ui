import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {NormalButton, TransparentButton,} from '../../../../../styles/components/buttons';
import {RowDiv} from '../../../../../styles/components/style';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import {CreatePageContent, IamSectionContents,} from '../../../../../styles/components/iam/addPage';
import {
	IamSectionBottomMargin,
	IamSectionTitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../../styles/components/iam/iam';
import RHF_Textbox from '../../../../RecycleComponents/ReactHookForm/RHF_Textbox';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const AddUser = ({setIsOpened}) => {
	const history = useHistory();

	const dispatch = useDispatch();
	// 이부분은 만들어서 넣어주면 됩니다.
	const telephoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
	const mobileRegex = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;

	const validation = Yup.object()
		.shape({
			id: yup
				.string()
				.min(5, '최소 길이는 5자 입니다.')
				.max(40, '최대 길이는 40자 입니다.')
				.required('아이디는 필수 입력 값입니다.'),
			name: yup
				.string()
				.max(30, '최대 길이는 30자 입니다.')
				.required('이름은 필수 입력 값입니다.'),
			email: yup
				.string()
				.email('올바른 이메일 형식이 아닙니다.')
				.required('이메일은 필수 입력 값입니다.'),
			telephone: yup
				.string()
				.matches(telephoneRegex, '형식에 맞지 않습니다.'),
			mobile: yup
				.string()
				.required('핸드폰 번호는 필수 입력 값입니다.')
				.matches(mobileRegex, '형식에 맞지 않습니다.'),
		})
		.required();

	const onClickCancelAddUser = useCallback(() => {
		history.push('/users');
	}, [history]);

	const addUserContents = [
		{
			name: 'id',
			placeholder: '사용자 계정 ID',
			description: '최대 40자, 영문 대소문자로 생성 가능합니다.',
		},
		{
			name: 'name',
			placeholder: '사용자 명',
			description: '최대 30자, 영문 포함 가능합니다.',
		},
		{
			name: 'email',
			placeholder: '이메일 주소',
			description: '최대 200자 가능합니다.',
		},
		{
			name: 'telephone',
			placeholder: '전화번호',
			description: '+82-(0)70-4469-4469과 같이 입력합니다.',
		},
		{
			name: 'mobile',
			placeholder: '모바일 전화번호',
			description: '+82-(0)70-4469-4469과 같이 입력합니다.',
		},
	];

	const onSubmitUserData = useCallback(
		async (data) => {
			console.log(data);
			try {
				const res = await dispatch(
					CURRENT_TARGET.action.addReadOnlyData({
						title: 'user',
						data: data,
					}),
				);
				console.log(res);
				setIsOpened(true);
			} catch (err) {
				console.error(err);
			}
		},
		[dispatch, setIsOpened],
	);

	const methods = useForm({
		resolver: yupResolver(validation),
	});

	return (
		<IamSectionBottomMargin>
			<IamSectionTitleBar>
				<TitleBarText>사용자 기본 정보</TitleBarText>
				<TitleBarButtons>
					<NormalButton
						onClick={methods.handleSubmit(onSubmitUserData)}
					>
						사용자 생성
					</NormalButton>
					<TransparentButton
						type={'button'}
						margin='0px 0px 0px 5px'
						onClick={onClickCancelAddUser}
					>
						취소
					</TransparentButton>
				</TitleBarButtons>
			</IamSectionTitleBar>
			<IamSectionContents>
			<TableOptionText data={'usersInfo'} />
			<CreatePageContent>
				<FormProvider {...methods}>
					{addUserContents.map((v) => {
						return (
							<RowDiv key={v.name} margin={'0px 0px 12px 0px'}>
								<RHF_Textbox
									name={v.name}
									placeholder={v.placeholder}
									description={v.description}
								/>
							</RowDiv>
						);
					})}
				</FormProvider>
				{/*<Form*/}
				{/*	initialValues={{*/}
				{/*		id: '',*/}
				{/*		name: '',*/}
				{/*		email: '',*/}
				{/*		telephone: '',*/}
				{/*		mobile: '',*/}
				{/*	}}*/}
				{/*	onSubmit={onSubmitUserData}*/}
				{/*	innerRef={formRef}*/}
				{/*	validation={validation}*/}
				{/*>*/}
				{/*	<RowDiv margin={'0px 0px 12px 0px'}>*/}
				{/*		<TextBox*/}
				{/*			name={'id'}*/}
				{/*			placeholder={'사용자 계정 ID'}*/}
				{/*			direction={'row'}*/}
				{/*		/>*/}
				{/*		<TextBoxDescription>*/}
				{/*			최대 40자, 영문 대소문자로 생성 가능합니다.*/}
				{/*		</TextBoxDescription>*/}
				{/*	</RowDiv>*/}
				{/*	<RowDiv margin={'0px 0px 12px 0px'}>*/}
				{/*		<TextBox*/}
				{/*			name={'name'}*/}
				{/*			placeholder={'사용자 명'}*/}
				{/*			direction={'row'}*/}
				{/*		/>*/}
				{/*		<TextBoxDescription>*/}
				{/*			최대 30자, 영문 포함 가능합니다.*/}
				{/*		</TextBoxDescription>*/}
				{/*	</RowDiv>*/}
				{/*	<RowDiv margin={'0px 0px 12px 0px'}>*/}
				{/*		<TextBox*/}
				{/*			name={'email'}*/}
				{/*			placeholder={'이메일 주소'}*/}
				{/*			direction={'row'}*/}
				{/*		/>*/}
				{/*		<TextBoxDescription>*/}
				{/*			최대 200자 가능합니다.*/}
				{/*		</TextBoxDescription>*/}
				{/*	</RowDiv>*/}
				{/*	<RowDiv margin={'0px 0px 12px 0px'}>*/}
				{/*		<TextBox*/}
				{/*			name={'telephone'}*/}
				{/*			placeholder={'전화번호'}*/}
				{/*			direction={'row'}*/}
				{/*		/>*/}
				{/*		<TextBoxDescription>*/}
				{/*			+82-(0)70-4469-4469과 같이 입력합니다.*/}
				{/*		</TextBoxDescription>*/}
				{/*	</RowDiv>*/}
				{/*	<RowDiv margin={'0px 0px 12px 0px'}>*/}
				{/*		<TextBox*/}
				{/*			name={'mobile'}*/}
				{/*			placeholder={'모바일 전화번호'}*/}
				{/*			direction={'row'}*/}
				{/*		/>*/}
				{/*		<TextBoxDescription>*/}
				{/*			+82-(0)70-4469-4469과 같이 입력합니다.*/}
				{/*		</TextBoxDescription>*/}
				{/*	</RowDiv>*/}
				{/*</Form>*/}
			</CreatePageContent>

			</IamSectionContents>
		</IamSectionBottomMargin>
	);
};

AddUser.propTypes = {
	setIsOpened: PropTypes.func,
};

export default AddUser;
