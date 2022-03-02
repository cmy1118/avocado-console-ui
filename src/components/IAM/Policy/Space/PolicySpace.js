import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {CurrentPathBar} from '../../../../styles/components/currentPathBar';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';
import {RowDiv} from '../../../../styles/components/style';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import Table from '../../../Table/Table';
import {tableColumns} from '../../../../Constants/Table/columns';
import {useDispatch, useSelector} from 'react-redux';
import PAGINATION from '../../../../reducers/pagination';
import PAM_SESSION from '../../../../reducers/api/PAM/session';
import IAM_USER_POLICY from '../../../../reducers/api/IAM/User/Policy/policy';
import * as _ from 'lodash';
import CurrentPathBarTemp from '../../../Header/CurrentPathBarTemp';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/policies', label: '정책'},
];

const PolicySpace = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	// const [users, setUsers] = useState([]);
	const {page, total} = useSelector(PAGINATION.selector);
	const [search, setSearch] = useState('');
	const [select, setSelect] = useState({});

	const policyData = useMemo(() => {
		return [
			{
				id: 'policy0',
				name: '정책 이름 0',
				manageCategory: 'Avocado 관리형',
				policyType: 'IAM',
				description: '정책 설명 0',
				link: '역할 연결 수',
				createdTime: '생성시간',
				[DRAGGABLE_KEY]: '0',
			},
			{
				id: 'policy1',
				name: '정책 이름 1',
				manageCategory: 'Avocado 관리형',
				policyType: 'PAM',
				description: '정책 설명 1',
				link: '역할 연결 수',
				createdTime: '생성시간',
				[DRAGGABLE_KEY]: '1',
			},
			{
				id: 'policy2',
				name: '정책 이름 2',
				manageCategory: 'Avocado 관리형',
				policyType: 'IAM',
				description: '정책 설명 2',
				link: '역할 연결 수',
				createdTime: '생성시간',
				[DRAGGABLE_KEY]: '2',
			},
		];
		// return (
		// 	users?.map((v) => ({
		// 		...v.user,
		// 		groups: groupsConverter(v.user.groups || []),
		// 		status: v.user.status.code,
		// 		createdTime: v.user.createdTag.createdTime,
		// 		[DRAGGABLE_KEY]: ,
		// 	})) || []
		// );
	}, []);

	const onClickLinkToAddPolicyPage = useCallback(() => {
		history.push('/policies/add');
	}, [history]);

	const onClickDeletePolicies = useCallback(() => {
		if (select[tableKeys.policy.basic]?.length) {
			console.log(select[tableKeys.policy.basic]);
			select[tableKeys.policy.basic].forEach((v) => {
				// todo : 정책 삭제 api 들어오면 해당 처리
				// dispatch(
				// 	IAM_USER.asyncAction.deleteAction({
				// 		userUid: v.userUid,
				// 	}),
				// );
			});
		}
	}, [select]);

	const getUsersDetailApi = useCallback(
		(res) => {
			const arr = [];
			dispatch(
				PAM_SESSION.asyncAction.findSessionAction({
					userUids: res.data.map((v) => v.userUid),
				}),
			)
				.unwrap()
				.then((sessions) => {
					res.data.forEach((sessionUser) => {
						dispatch(
							IAM_USER_POLICY.asyncAction.getsAction({
								userUid: sessionUser.userUid,
							}),
						)
							.unwrap()
							.then((policy) => {
								arr.push({
									user: sessionUser,
									session: sessions.data.find(
										(session) =>
											sessionUser.userUid ===
											session.userUid,
									),
									policies: _.uniqBy(
										_.flatten(
											_.flatten(
												policy.map(
													(v) => v.policyTemplates,
												),
											).map((x) => x.details),
										),
										'policyType',
									),
								});
								if (arr.length === res.data.length) {
									// setUsers(arr);
								}
							});
					});
				});
		},
		[dispatch],
	);

	const getPolicyApi = useCallback((search) => {
		// todo : 정책 가져오는 api 생기면 처리
		// if (page[tableKeys.policy.basic]) {
		// 	dispatch(
		// 		IAM_USER.asyncAction.findAllAction({
		// 			range: page[tableKeys.policy.basic],
		// 			...(search && {keyword: search}),
		// 		}),
		// 	)
		// 		.unwrap()
		// 		.then((res) => {
		// 			dispatch(
		// 				PAGINATION.action.setTotal({
		// 					tableKey: tableKeys.policy.basic,
		// 					element: totalNumberConverter(
		// 						res.headers['content-range'],
		// 					),
		// 				}),
		// 			);
		// 			res.data.length ? getUsersDetailApi(res) : setUsers([]);
		// 		})
		// 		.catch((error) => {
		// 			console.error('error:', error);
		// 			dispatch(
		// 				PAGINATION.action.setTotal({
		// 					tableKey: tableKeys.policy.basic,
		// 					element: 0,
		// 				}),
		// 			);
		// 			setUsers([]);
		// 		});
		// }
	}, []);

	useEffect(() => {
		getPolicyApi(search);
	}, [getPolicyApi, page, search]);

	return (
		<IamContainer>
			<CurrentPathBarTemp paths={paths} />
			<TitleBar>
				<RowDiv width={'100%'} justifyContent={'space-between'}>
					<div>정책 : {total[tableKeys.policy.basic] || 0}</div>
					<TitleBarButtons>
						<NormalButton onClick={onClickLinkToAddPolicyPage}>
							정책 생성
						</NormalButton>
						<TransparentButton
							margin={'0px 0px 0px 5px'}
							onClick={onClickDeletePolicies}
						>
							삭제
						</TransparentButton>
					</TitleBarButtons>
				</RowDiv>
			</TitleBar>

			<Table
				tableKey={tableKeys.policy.basic}
				columns={tableColumns[tableKeys.policy.basic]}
				data={policyData}
				isPaginable
				isSearchable
				isSearchFilterable
				isColumnFilterable
				setSearch={setSearch}
			/>
		</IamContainer>
	);
};

export default PolicySpace;
