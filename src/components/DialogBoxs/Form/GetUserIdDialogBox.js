import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
} from 'react';
import Form from '../../RecycleComponents/New/Form';
import TextBox from '../../RecycleComponents/New/TextBox';

const GetUserIdDialogBox = forwardRef((props, ref) => {
	const formRef = useRef(null);

	const onSubmitUserId = useCallback((data) => {
		console.log('ASDFasfs');
		console.log(data);
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
				<TextBox name={'id'} />
			</Form>
		</div>
	);
});

GetUserIdDialogBox.displayName = 'GetUserIdDialogBox';

export default GetUserIdDialogBox;
