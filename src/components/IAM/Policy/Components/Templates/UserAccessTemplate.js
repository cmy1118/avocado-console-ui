import React, {useState} from 'react';
import TimeInterval from '../../../../RecycleComponents/Templates/TimeInterval';

const UserAccessTemplate = () => {
	const contents = {
		dayOfWeek: {
			mon: '월',
			tue: '화',
			wed: '수',
			thu: '목',
			fri: '금',
			sat: '토',
			sun: '일',
		},
	};
	const [intervals, setIntervals] = useState({});

	return (
		<div>
			<TimeInterval />
		</div>
	);
};

export default UserAccessTemplate;
