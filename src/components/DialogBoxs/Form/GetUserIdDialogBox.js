import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
} from 'react';
import Form from '../../RecycleComponents/New/Form';
import TextBox from '../../RecycleComponents/New/TextBox';
import PropTypes from 'prop-types';
import {
	altAuthType,
	googleAuth,
	kakaoAuth,
	naverAuth,
} from '../../../utils/auth';

const GetUserIdDialogBox = forwardRef(({type}, ref) => {
	const formRef = useRef(null);

	const onSubmitUserId = useCallback((data) => {
		console.log(data);
		localStorage.setItem('id', data.id);

		switch (type) {
			//todo
			case altAuthType.google:
				location.href = googleAuth.location;
				break;

			case altAuthType.naver:
				location.href = naverAuth.location;
				break;

			case altAuthType.kakao:
				location.href = kakaoAuth.location;
				break;

			case altAuthType.apple:
				break;

			default:
				break;
		}
	}, []);

	useImperativeHandle(ref, () => ({
		onSubmitUserId,
	}));

	return (
		<div>
			<div>아이디를 입력하시오</div>
			<Form
				initialValues={{id: ''}}
				onSubmit={onSubmitUserId}
				innerRef={formRef}
			>
				<TextBox name={'id'} placeholder={'id'} />
			</Form>
		</div>
	);
});

GetUserIdDialogBox.displayName = 'GetUserIdDialogBox';

GetUserIdDialogBox.propTypes = {
	type: PropTypes.string.isRequired,
};
export default GetUserIdDialogBox;
