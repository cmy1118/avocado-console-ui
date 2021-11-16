import React, {useCallback} from 'react';
import {DialogBoxFooter} from '../../../../styles/components/dialogBox';
import {
	NormalBorderButton,
	TransparentBorderButton,
} from '../../../../styles/components/buttons';

const CalendarOptionFooter = () => {
	const onClickCancel = useCallback(() => {}, []);

	const onClickApplyFilter = useCallback(() => {}, []);

	return (
		<DialogBoxFooter>
			<TransparentBorderButton onClick={onClickCancel}>
				취소
			</TransparentBorderButton>
			<NormalBorderButton onClick={onClickApplyFilter}>
				적용
			</NormalBorderButton>
		</DialogBoxFooter>
	);
};

export default CalendarOptionFooter;
