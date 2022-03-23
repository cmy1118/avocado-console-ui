import React, {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import RRM_RESOURCE from '../../../../../../../reducers/api/RRM/Resource/resource';
import {ColDiv} from '../../../../../../../styles/components/style';
import Table from '../../../../../../Table/Table';
import {configs as authSelector} from 'eslint-plugin-react';

function DefaultCheckbox(props) {
	return null;
}

DefaultCheckbox.propTypes = {};
/******************************************************************
 * roberto - 자원 계정목록  컴포넌트
 *
 * lastClicked : 자원목록 테이블 (Resources.js) 선택된 행정보 - 객체 배열
 *****************************************************************/
const Accounts = ({lastClicked}) => {
	const dispatch = useDispatch();
	//accout: 테이블에 넘겨주기위한 계정정보 데이터 state
	const [accout, setAccount] = useState([]);
	//accountColumn: 테이블에 넘겨주기위한 계정정보 컬럼 데이터
	const accountColumn = [
		{
			accessor: 'account',
			Header: '접속 계정',
		},
		{
			accessor: 'type',
			Header: '인증 타입',
		},
		{
			Header: '기본 계정 여부',
			accessor: 'isDefault',
			Cell: function Component(cell) {
				return <DefaultCheckbox cell={cell} />;
			},
		},
	];

	const findAllAccountActionApi = useCallback(async () => {
		try {
			const response = await dispatch(
				RRM_RESOURCE.asyncAction.findAllAccountAction({
					resourceId: lastClicked ? lastClicked.id : true,
				}),
			);
			console.log('response:', response);
			await setAccount(response);
			// await alert('계정 API호출 완료');
		} catch (err) {
			console.log(err);
			await alert('계정 API호출 에러');
		}
	}, [dispatch, lastClicked]);

	/******************************************************************
	 * 렌더링시 자원목록 선택 계정 자원
	 *****************************************************************/
	useEffect(() => {
		console.log('lastClicked:', lastClicked);
		findAllAccountActionApi();
	}, [findAllAccountActionApi, lastClicked]);
	return (
		<ColDiv>
			<Table
				tableKey={'PAM_Account'}
				columns={accountColumn}
				data={lastClicked ? accout : []}
				optionBarTitle={
					lastClicked
						? `[ ${lastClicked.name} ] 계정 목록 : ${accout.length}건`
						: `계정 목록 :`
				}
				searchFilters={['account']}
				width={'394px'}
				isSearchable
			/>
		</ColDiv>
	);
};

Accounts.propTypes = {
	lastClicked: PropTypes.object,
};

export default Accounts;
