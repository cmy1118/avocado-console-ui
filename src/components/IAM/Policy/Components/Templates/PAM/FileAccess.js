import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

const FileAccess = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);

	/**************************************************
	 * seob - 규칙 템플릿 id에 해당하는 데이터 findById
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			console.log('api 작업');
			// const res = await dispatch(
			// 	PAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.findById({
			// 		// templateId,
			// 	}),
			// );
			// if (isFulfilled(res)) {
			// 	console.log(res.payload.data);
			// } else {
			// 	// 에러 핸들링
			// 	console.log(res.error);
			// }
		};
		fetchData();
	}, [dispatch]);
	return <div>FileAccess</div>;
};

export default FileAccess;
