import React, {useMemo} from 'react';

import TableContainer from './TableContainer';
import Table from './Table';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import IAM_USER_POLICY from '../../reducers/api/IAM/User/Policy/policy';

const InnerTableContainer = ({policyId, attributes}) => {
	const dispatch = useDispatch();
	console.log(attributes);
	// const columns = useMemo(
	// 	() => [
	// 		{
	// 			Header: '인증 유형',
	// 			accessor: 'authType',
	// 		},
	// 		{
	// 			Header: '대체 인증',
	// 			accessor: 'alterAuthType',
	// 		},
	// 		{
	// 			Header: 'MFA(다중인증)',
	// 			accessor: 'multiAuth',
	// 		},
	// 		{
	// 			Header: '본인 인증 확인',
	// 			accessor: 'auth',
	// 		},
	// 		{
	// 			Header: 'Fail Over',
	// 			accessor: 'failOver',
	// 		},
	// 	],
	// 	[],
	// );

	const columns = useMemo(() => {
		return attributes?.map((v) => ({
			Header: v.policyType,
			accessor: v.policyType,
		}));
	}, [attributes]);

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

	// const data = useMemo(
	// 	() => {
	// 		return attributes?.map((v) => ({
	// 	 v.policyType:v.policies[0]
	//
	// 		}));
	// 	},
	// 	[attributes],
	// 	[],
	// );

	// useMemo(() => {
	// 	if (policyId) {
	// 		dispatch(
	// 			IAM_USER_POLICY.asyncAction.grantGetsAction({roleId: policyId}),
	// 		)
	// 			.unwrap()
	// 			.then((v) => {
	// 				console.log(v);
	// 			});
	// 	}
	// }, [policyId]);

	return (
		<div>
			<TableContainer
				tableKey={'innerTable'}
				columns={columns}
				data={data}
				mode={'inner'}
			>
				<Table />
			</TableContainer>
		</div>
	);
};

InnerTableContainer.propTypes = {
	policyId: PropTypes.string,
	attributes: PropTypes.array,
};

export default InnerTableContainer;
