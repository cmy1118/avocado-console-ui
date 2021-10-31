import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import {TabContentsTitle} from '../../../styles/components/tab';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import {formKeys} from '../../../utils/data';
import ModalFormContainer from '../../RecycleComponents/ModalFormContainer';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../styles/components/buttons';
import NewInput from '../../RecycleComponents/New/NewInput';
import NewForm from '../../RecycleComponents/New/NewForm';
import {ColDiv, RowDiv} from '../../../styles/components/div';
import {Label} from '../../../styles/components/text';

const UserInfoTab = ({userId}) => {
	const [values, setValues] = useState({email: '', number: ''});
	const confirmAuthRef = useRef(null);
	const changePasswordRef = useRef(null);

	const [isIdentificationOpened, setIsIdentificationOpened] = useState(false);
	const [isChangePasswordOpened, setIsChangePasswordOpened] = useState(false);
	const {users} = useSelector(IAM_USER.selector);
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const onClickSaveChangedInfo = useCallback((data) => {
		console.log('api 처리 : ', data);
		setIsChangePasswordOpened(false);
	}, []);

	const onClickOpenIdentificationDialogBox = useCallback(() => {
		setIsIdentificationOpened(true);
	}, []);

	const onClickOkBtn = useCallback(() => {
		setIsChangePasswordOpened(true);
		setIsIdentificationOpened(false);
	}, []);

	return (
		<div>
			<TabContentsTitle>
				<div>기본정보</div>
				<NormalButton form={formKeys.userInfoForm}>저장</NormalButton>
			</TabContentsTitle>

			<NewForm
				initialValues={{
					id: user.id,
					name: user.name,
					password: '*********',
					email: user.email,
					telephone: user.telephone,
					mobile: user.mobile,
				}}
				onSubmit={(data) => console.log(data)}
			>
				<RowDiv margin={'0px 0px 12px 0px'}>
					<Label htmlFor={'id'}>
						<li>사용자 ID</li>
					</Label>
					<NewInput name={'id'} />
				</RowDiv>
				<RowDiv margin={'0px 0px 12px 0px'}>
					<Label htmlFor={'name'}>
						<li>사용자 이름</li>
					</Label>
					<NewInput name={'name'} />
				</RowDiv>
				<RowDiv margin={'0px 0px 12px 0px'}>
					<Label htmlFor={'password'}>
						<li>비밀번호</li>
					</Label>
					<NewInput name={'password'} />
					<NormalBorderButton
						type={'button'}
						onClick={onClickOpenIdentificationDialogBox}
					>
						비밀번호 변경
					</NormalBorderButton>
				</RowDiv>
				<RowDiv margin={'0px 0px 12px 0px'}>
					<Label htmlFor={'email'}>
						<li>이메일 주소</li>
					</Label>
					<NewInput name={'email'} />
				</RowDiv>
				<RowDiv margin={'0px 0px 12px 0px'}>
					<Label htmlFor={'telephone'}>
						<li>전화번호</li>
					</Label>
					<NewInput name={'telephone'} />
				</RowDiv>
				<RowDiv margin={'0px 0px 12px 0px'}>
					<Label htmlFor={'mobile'}>
						<li>모바일 전화번호</li>
					</Label>
					<NewInput name={'mobile'} />
				</RowDiv>
			</NewForm>

			<ModalFormContainer
				isOpened={isIdentificationOpened}
				setIsOpened={setIsIdentificationOpened}
				title={'본인 확인'}
				innerRef={confirmAuthRef}
			>
				<NewForm
					initialValues={values}
					setValues={setValues}
					onSubmit={onClickOkBtn}
					innerRef={confirmAuthRef}
				>
					<Label htmlFor={'email'}>이메일 주소</Label>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<NewInput name={'email'} placeholder={'E-mail 주소'} />
						<NormalButton
							type={'button'}
							onClick={() => console.log(values.email)}
						>
							인증번호 전송
						</NormalButton>
					</RowDiv>
					<Label htmlFor={'number'}>인증번호</Label>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<NewInput
							name={'number'}
							placeholder={'인증번호 입력'}
						/>
						<NormalButton
							type={'button'}
							onClick={() => console.log(values.number)}
						>
							인증하기
						</NormalButton>
					</RowDiv>
				</NewForm>
			</ModalFormContainer>

			<ModalFormContainer
				isOpened={isChangePasswordOpened}
				setIsOpened={setIsChangePasswordOpened}
				title={'비밀번호 변경'}
				innerRef={changePasswordRef}
			>
				<NewForm
					initialValues={{old: '', new: '', confirm: ''}}
					onSubmit={onClickSaveChangedInfo}
					innerRef={changePasswordRef}
				>
					<ColDiv margin={'0px 0px 12px 0px'}>
						<Label>현재 비밀번호</Label>
						<NewInput
							name={'old'}
							placeholder={'현재 비밀번호를 입력하십시오.'}
						/>
					</ColDiv>
					<ColDiv margin={'0px 0px 12px 0px'}>
						<Label>새로운 비밀번호</Label>
						<NewInput
							name={'new'}
							placeholder={'새로운 비밀번호를 입력하십시오'}
						/>
					</ColDiv>
					<ColDiv margin={'0px 0px 12px 0px'}>
						<Label>비밀번호 확인</Label>
						<NewInput
							name={'confirm'}
							placeholder={'새로운 비밀번호를 입력하십시오'}
						/>
					</ColDiv>
				</NewForm>
			</ModalFormContainer>
		</div>
	);
};

UserInfoTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserInfoTab;
