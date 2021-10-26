import React, {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import {TabContentsTitle} from '../../../styles/components/tab';
import IdentificationDialogBox from '../../DialogBoxs/Form/IdentificationDialogBox';
import ChangePasswordDialogBox from '../../DialogBoxs/Form/ChangePasswordDialogBox';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import {formKeys} from '../../../utils/data';
import FormTextBox from '../../RecycleComponents/FormTextBox';
import Form from '../../RecycleComponents/Form';
import {NormalBorderButton} from '../../../styles/components/buttons';

const UserInfoTab = ({userId}) => {
	const [isIdentificationOpened, setIsIdentificationOpened] = useState(false);
	const [isChangePasswordOpened, setIsChangePasswordOpened] = useState(false);
	const {users} = useSelector(IAM_USER.selector);
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const onClickSaveChangedInfo = useCallback((data) => {
		console.log(data);
	}, []);

	const onClickOpenIdentificationDialogBox = useCallback(() => {
		setIsIdentificationOpened(true);
	}, []);

	return (
		<div>
			<TabContentsTitle>
				<div>기본정보</div>
				<button form={formKeys.userInfoForm}>저장</button>
			</TabContentsTitle>

			<Form id={formKeys.userInfoForm} onSubmit={onClickSaveChangedInfo}>
				<FormTextBox
					name={'id'}
					label={'사용자 ID : '}
					defaultValue={user.id}
				/>
				<FormTextBox
					name={'name'}
					label={'사용자 이름 : '}
					defaultValue={user.name}
				/>
				<FormTextBox
					name={'password'}
					label={'사용자 비밀번호 : '}
					defaultValue={'**********'}
				>
					<NormalBorderButton
						type={'button'}
						onClick={onClickOpenIdentificationDialogBox}
					>
						비밀번호 변경
					</NormalBorderButton>
				</FormTextBox>
				<FormTextBox
					name={'email'}
					label={'이메일 주소 : '}
					defaultValue={user.email}
				/>
				<FormTextBox
					name={'telephone'}
					label={'전화번호 : '}
					defaultValue={user.telephone}
				/>
				<FormTextBox
					name={'mobile'}
					label={'모바일 번호 : '}
					defaultValue={user.mobile}
				/>
			</Form>

			<IdentificationDialogBox
				isOpened={isIdentificationOpened}
				setIsOpened={setIsIdentificationOpened}
			/>
			<ChangePasswordDialogBox
				isOpened={isChangePasswordOpened}
				setIsOpened={setIsChangePasswordOpened}
			/>
		</div>
	);
};

UserInfoTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserInfoTab;
