import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
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
import CurrentPathBar from '../../../Header/CurrentPathBar';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import {totalNumberConverter} from '../../../../utils/tableDataConverter';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/policies', label: '정책'},
];

const MANAGE_TYPE = {
	Avocado: 'Avocado 관리형',
	Client: '고객 관리형',
};

const APPLICATION_CODE = {
	iam: 'IAM',
	pam: 'PAM',
};

const PolicySpace = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [select, column] = useSelectColumn(
		tableColumns[tableKeys.policy.basic],
	);

	// memo : 추후에 데이터를 iam, pam따로 관리하면 그대로 사용 / 아닌경우 policies로 통합해서 사용
	// iam 정책 유형들
	const [iamPolicies, setIamPolicies] = useState([]);
	// pam 정책 유형들
	const [pamPolicies, setPamPolicies] = useState([]);
	const {page, total} = useSelector(PAGINATION.selector);
	const [search, setSearch] = useState('');
	// const [select, setSelect] = useState([]);
	console.log('select:', select);
	// 0:
	// controlTypes: [{…}]
	// createdTag: {createdTime: '2022-02-21T18:09:09.365+09:00', applicationCode: {…}, clientId: 'admin', requestId: '111e418e-04e5-46af-8725-6c6553a43912', userUid: 'KR-2020-0001:0000001'}
	// description: "기본 인증"
	// grantCount: 0
	// id: "KR-2020-0001:202202:0001"
	// lastEventId: 0
	// maxGrants: 1
	// name: "글로벌 정책"
	// type: {code: 0, name: 'Avocado'}
	// [[Prototype]]: Object
	// 1:
	// controlTypes: [{…}]
	// createdTag: {createdTime: '2022-02-21T18:09:09.365+09:00', applicationCode: {…}, clientId: 'admin', requestId: '111e418e-04e5-46af-8725-6c6553a43912', userUid: 'KR-2020-0001:0000001'}
	// description: ""
	// grantCount: 0
	// id: "KR-2020-0001:202202:0002"
	// lastEventId: 0
	// maxGrants: 1000
	// name: "사용자 인증"
	// type: {code: 1, name: 'Client'}

	const policyData = useMemo(() => {
		return iamPolicies.map((v) => ({
			...v,
			manageCategory: MANAGE_TYPE[v.type.name],
			policyType: APPLICATION_CODE.iam,
			description: v.description === '' ? '없음' : v.description,
			createdTime: v.createdTag.createdTime,
			[DRAGGABLE_KEY]: v.id,
		}));
		// 	{
		// 		id: 'policy2',
		// 		name: '정책 이름 2',
		// 		manageCategory: 'Avocado 관리형',
		// 		policyType: 'IAM',
		// 		description: '정책 설명 2',
		// 		link: '역할 연결 수',
		// 		createdTime: '생성시간',
		// 		[DRAGGABLE_KEY]: '2',
		// 	},
		// ];
	}, [iamPolicies]);

	const onClickLinkToAddPolicyPage = useCallback(() => {
		history.push('/policies/add');
	}, [history]);

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

	const getPolicyApi = useCallback(
		(search) => {
			// memo IAM 정책 findAll 입니다. PAM은 백앤드 작업 이후 처리 예정입니다.
			if (page[tableKeys.policy.basic]) {
				dispatch(
					IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.findAll({
						range: page[tableKeys.policy.basic],
						// ...(search && {keyword: search}),
					}),
				)
					.unwrap()
					.then((res) => {
						dispatch(
							PAGINATION.action.setTotal({
								tableKey: tableKeys.policy.basic,
								element: totalNumberConverter(
									res.headers['content-range'],
								),
							}),
						);

						setIamPolicies(res.data);
						// res.data.length ? getUsersDetailApi(res) : setUsers([]);
					})
					.catch((error) => {
						console.error('error:', error);
						dispatch(
							PAGINATION.action.setTotal({
								tableKey: tableKeys.policy.basic,
								element: 0,
							}),
						);
						// setUsers([]);
					});
			}
		},
		[dispatch, page],
	);

	async function errorHandler(res) {
		try {
			console.log('res:', res);
			console.log('res.unwrap():', res.unwrap());
			return res.unwrap();
		} catch (e) {
			console.log(e);
		}
	}

	const onClickDeletePolicies = useCallback(async () => {
		try {
			if (select.length) {
				for (const v of select) {
					await dispatch(
						IAM_USER_POLICY.asyncAction.deleteAction({
							// hp: v.id,
							id: v.id,
						}),
					).unwrap();
				}
			}
			await getPolicyApi();
			alert('정책 삭제 완료');
		} catch (a) {
			alert('정책 삭제 오류');
			console.log(a);
		}
	}, [dispatch, getPolicyApi, select]);
	const subComponentHandler = ({row, setData, setColumns, setLoading}) => {
		console.log(row);

		setLoading(false);

		setData([
			{
				id: '테스트1',
				[DRAGGABLE_KEY]: '테스트1',
				a: '테스트1',
				b: '테스트1',
				c: '테스트1',
				d: '테스트1',
				e: '테스트1',
				f: '테스트1',
			},
			{
				id: '테스트2',
				[DRAGGABLE_KEY]: '테스트2',
				a: '테스트2',
				b: '테스트2',
				c: '테스트2',
				d: '테스트2',
				e: '테스트2',
				f: '테스트2',
			},
			{
				id: '테스트3',
				[DRAGGABLE_KEY]: '테스트3',
				a: '테스트3',
				b: '테스트3',
				c: '테스트3',
				d: '테스트3',
				e: '테스트3',
				f: '테스트3',
			},
		]);
		setColumns([
			// callExpander(),
			{
				Header: 'AAAAAAAA',
				accessor: 'a',
			},
			{
				Header: 'BBBBBBBB',
				accessor: 'b',
			},
			{
				Header: 'CCCCCCCC',
				accessor: 'c',
			},
			{
				Header: 'DDDDDDDD',
				accessor: 'd',
			},
			{
				Header: 'EEEEEEEEEE',
				accessor: 'e',
			},
			{
				Header: 'FFFFFFFFF',
				accessor: 'f',
			},
		]);
	};

	useEffect(() => {
		getPolicyApi(search);
	}, [getPolicyApi, page, search]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />
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
				columns={column}
				data={policyData}
				isPaginable
				isSearchable
				isSearchFilterable
				isColumnFilterable
				setSearch={setSearch}
				subComponentHandler={subComponentHandler}
			/>
		</IamContainer>
	);
};

export default PolicySpace;
