import React, {useState, useCallback} from 'react';
import Modal from '../components/Table/Modal';

const OPTION = {
	show: false, // 모달을 키고 끄는 옵션
	title: '', // 모달의 문구
	onSubmit: () => {}, // 모달을 킬 때마다 사용할 콜백 함수
	onClose: () => {}, // 모달을 끌 때마다 사용할 콜백 함수
	element: null, // 모달마다 넣고 싶은 추가 컴포넌트 자리
};

const useModal = () => {
	const [modalOption, setModalOption] = useState(OPTION);

	const showModal = useCallback(
		(show, title, onSubmitCallback, onCloseCallback, element) => {
			setModalOption((prev) => ({
				...prev,
				show,
				title,
				onSubmit: () => {
					if (onSubmitCallback) onSubmitCallback();
					setModalOption((prev) => ({...prev, show: false}));
				},
				onClose: () => {
					if (onCloseCallback) onCloseCallback();
					setModalOption((prev) => ({...prev, show: false}));
				},
				element,
			}));
		},
		[],
	);

	const Modals = (props) => <Modal modalOption={modalOption} {...props} />;

	return [Modals, showModal];
};

export default useModal;
