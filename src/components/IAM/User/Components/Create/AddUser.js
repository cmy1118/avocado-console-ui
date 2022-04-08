import React, {useCallback, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import * as yup from 'yup';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import Form from '../../../../RecycleComponents/New/Form';
import TextBox from '../../../../RecycleComponents/New/TextBox';
import {RowDiv} from '../../../../../styles/components/style';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import {
	AddPageContent,
	TextBoxDescription,
} from '../../../../../styles/components/iam/addPage';
import {
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../../styles/components/iam/iam';

const AddUser = ({setIsOpened}) => {
	const history = useHistory();
	const formRef = useRef(null);

	const dispatch = useDispatch();
	// 이부분은 만들어서 넣어주면 됩니다.
	const telephoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
	const mobileRegex = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;

	const validation = {
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
	};

	const onClickCancelAddUser = useCallback(() => {
		history.push('/users');
	}, [history]);

	const onSubmitUserData = useCallback(
		(data) => {
			dispatch(
				CURRENT_TARGET.action.addReadOnlyData({
					title: 'user',
					data: data,
				}),
			);
			setIsOpened(true);
		},
		[dispatch, setIsOpened],
	);

	return (
		<>
			<TitleBar>
				<TitleBarText>사용자 기본 정보</TitleBarText>
				<TitleBarButtons>
					<NormalButton
						onClick={() => formRef.current.handleSubmit()}
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
			</TitleBar>
			<TableOptionText data={'usersInfo'} />
			<AddPageContent>
				<Form
					initialValues={{
						id: '',
						name: '',
						email: '',
						telephone: '',
						mobile: '',
					}}
					onSubmit={onSubmitUserData}
					innerRef={formRef}
					validation={validation}
				>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<TextBox
							name={'id'}
							placeholder={'사용자 계정 ID'}
							direction={'row'}
						/>
						<TextBoxDescription>
							최대 40자, 영문 대소문자로 생성 가능합니다.
						</TextBoxDescription>
					</RowDiv>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<TextBox
							name={'name'}
							placeholder={'사용자 명'}
							direction={'row'}
						/>
						<TextBoxDescription>
							최대 30자, 영문 포함 가능합니다.
						</TextBoxDescription>
					</RowDiv>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<TextBox
							name={'email'}
							placeholder={'이메일 주소'}
							direction={'row'}
						/>
						<TextBoxDescription>
							최대 200자 가능합니다.
						</TextBoxDescription>
					</RowDiv>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<TextBox
							name={'telephone'}
							placeholder={'전화번호'}
							direction={'row'}
						/>
						<TextBoxDescription>
							+82-(0)70-4469-4469과 같이 입력합니다.
						</TextBoxDescription>
					</RowDiv>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<TextBox
							name={'mobile'}
							placeholder={'모바일 전화번호'}
							direction={'row'}
						/>
						<TextBoxDescription>
							+82-(0)70-4469-4469과 같이 입력합니다.
						</TextBoxDescription>
					</RowDiv>
				</Form>
			</AddPageContent>
		</>
	);
};

AddUser.propTypes = {
	setIsOpened: PropTypes.func,
};

export default AddUser;