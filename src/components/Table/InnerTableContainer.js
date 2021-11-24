import React, {useMemo} from 'react';

import TableContainer from './TableContainer';
import Table from './Table';

const InnerTableContainer = () => {
	const columns = useMemo(
		() => [
			{
				Header: '인증 유형',
				accessor: 'authType',
			},
			{
				Header: '대체 인증',
				accessor: 'alterAuthType',
			},
			{
				Header: 'MFA(다중인증)',
				accessor: 'multiAuth',
			},
			{
				Header: '본인 인증 확인',
				accessor: 'auth',
			},
			{
				Header: 'Fail Over',
				accessor: 'failOver',
			},
		],
		[],
	);

	const data = useMemo(
		() => [
			{
				authType: 'ID/Password',
				alterAuthType: '사용하지 않음',
				multiAuth: 'Email(OTP)',
				auth: 'Email',
				failOver: '사용안함',
			},
		],
		[],
	);

	return (
		<div>
			<TableContainer columns={columns} data={data} mode={'inner'}>
				<Table />
			</TableContainer>
		</div>
	);
};

export default InnerTableContainer;
