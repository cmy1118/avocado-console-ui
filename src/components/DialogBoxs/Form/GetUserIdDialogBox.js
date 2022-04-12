import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
} from 'react';
import Form from '../../RecycleComponents/New/Form';
import TextBox from '../../RecycleComponents/New/TextBox';
import PropTypes from 'prop-types';
import {GoogleAuth} from '../../../utils/auth';

const GetUserIdDialogBox = forwardRef(({type}, ref) => {
	const formRef = useRef(null);

	const onSubmitUserId = useCallback((data) => {
		console.log('Form의 값을 어디 한번 출력해봅시다~');
		console.log(data);

		switch (type) {
			//todo
			case 'google':
				location.href = GoogleAuth.location;
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
