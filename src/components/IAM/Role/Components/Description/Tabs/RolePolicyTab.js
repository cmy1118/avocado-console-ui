import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../../styles/components/buttons';
import Table from '../../../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import DragContainer from '../../../../../Table/DragContainer';
import {TableTitle} from '../../../../../../styles/components/table';
import FoldableContainer from '../../../../../Table/Options/FoldableContainer';
import TableOptionText from '../../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {TitleBarButtons} from '../../../../../../styles/components/iam/iam';
import {useDispatch, useSelector} from 'react-redux';
import AUTH from '../../../../../../reducers/api/Auth/auth';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import IAM_USER_POLICY_GRANT_REVOKE_ROLE from '../../../../../../reducers/api/IAM/User/Policy/GrantRevoke/role';
import {useHistory} from 'react-router-dom';

// const policyType = {
// 	'KR-2020-0005:202111:0001': '사용자 인증',
// 	'KR-2020-0005:202111:0002': '사용자 인증',
// 	'KR-2020-0005:202111:0003': '사용자 인증',
// 	'KR-2020-0005:202111:0004': '본인 인증',
// 	'KR-2020-0005:202111:0005': '기본 인증',
// 	'KR-2020-0005:202111:0006': '계정 만료',
// 	'KR-2020-0005:202111:0007': '잠금 해제',
// 	'KR-2020-0006:202111:0001': '사용자 인증',
// 	'KR-2020-0006:202111:0002': '사용자 인증',
// 	'KR-2020-0006:202111:0003': '사용자 인증',
// 	'KR-2020-0006:202111:0004': '본인 인증',
// 	'KR-2020-0006:202111:0005': '기본 인증',
// 	'KR-2020-0006:202111:0006': '계정 만료',
// 	'KR-2020-0006:202111:0007': '잠금 해제',
// };
// const policyDescription = {
// 	'KR-2020-0005:202111:0001': '기본 인증 정책',
// 	'KR-2020-0005:202111:0002': 'Social 인증 정책',
// 	'KR-2020-0005:202111:0003': 'MFA 인증 정책',
// 	'KR-2020-0005:202111:0004': '본인 여부를 확인하기 위한 인증 정책',
// 	'KR-2020-0005:202111:0005': '기본 인증 정책',
// 	'KR-2020-0005:202111:0006': '사용자 계정 만료 정책',
// 	'KR-2020-0005:202111:0007': '로그인 N회 실패시 잠금 정책',
// 	'KR-2020-0006:202111:0001': '기본 인증 정책',
// 	'KR-2020-0006:202111:0002': 'Social 인증 정책',
// 	'KR-2020-0006:202111:0003': 'MFA 인증 정책',
// 	'KR-2020-0006:202111:0004': '본인 여부를 확인하기 위한 인증 정책',
// 	'KR-2020-0006:202111:0005': '기본 인증 정책',
// 	'KR-2020-0006:202111:0006': '사용자 계정 만료 정책',
// 	'KR-2020-0006:202111:0007': '로그인 N회 실패시 잠금 정책',
// };
// const policyNmberOfRoles = {
// 	'KR-2020-0005:202111:0001': 3,
// 	'KR-2020-0005:202111:0002': 1,
// 	'KR-2020-0005:202111:0003': 2,
// 	'KR-2020-0005:202111:0004': 3,
// 	'KR-2020-0005:202111:0005': 1,
// 	'KR-2020-0005:202111:0006': 1,
// 	'KR-2020-0005:202111:0007': 1,
// 	'KR-2020-0006:202111:0001': 3,
// 	'KR-2020-0006:202111:0002': 1,
// 	'KR-2020-0006:202111:0003': 2,
// 	'KR-2020-0006:202111:0004': 3,
// 	'KR-2020-0006:202111:0005': 1,
// 	'KR-2020-0006:202111:0006': 1,
// 	'KR-2020-0006:202111:0007': 1,
// };
//
// const policyCreationTime = {
// 	'KR-2020-0005:202111:0001': '2021-11-26T19:13:16.446+09:00',
// 	'KR-2020-0005:202111:0002': '2021-11-26T19:13:21.266+09:00',
// 	'KR-2020-0005:202111:0003': '2021-11-26T19:14:01.500+09:00',
// 	'KR-2020-0005:202111:0004': '2021-11-26T20:09:13.240+09:00',
// 	'KR-2020-0005:202111:0005': '2021-11-26T21:21:24.401+09:00',
// 	'KR-2020-0005:202111:0006': '2021-11-26T21:13:16.630+09:00',
// 	'KR-2020-0005:202111:0007': '2021-11-26T23:32:12.420+09:00',
// 	'KR-2020-0006:202111:0001': '2021-11-26T19:13:16.446+09:00',
// 	'KR-2020-0006:202111:0002': '2021-11-26T19:13:21.266+09:00',
// 	'KR-2020-0006:202111:0003': '2021-11-26T19:14:01.500+09:00',
// 	'KR-2020-0006:202111:0004': '2021-11-26T20:09:13.240+09:00',
// 	'KR-2020-0006:202111:0005': '2021-11-26T21:21:24.401+09:00',
// 	'KR-2020-0006:202111:0006': '2021-11-26T21:13:16.630+09:00',
// 	'KR-2020-0006:202111:0007': '2021-11-26T23:32:12.420+09:00',
// };
//
// const pamPolicyType = {
// 	'KR-2020-0005:00000000001': '권한 관리',
// 	'KR-2020-0005:00000000002': '권한 관리',
// 	'KR-2020-0005:00000000003': '권한 관리',
// 	'KR-2020-0005:00000000004': '권한 관리',
// 	'KR-2020-0005:00000000005': '권한 관리',
// 	'KR-2020-0005:00000000006': '권한 관리',
// 	'KR-2020-0006:00000000001': '권한 관리',
// 	'KR-2020-0006:00000000002': '권한 관리',
// 	'KR-2020-0006:00000000003': '권한 관리',
// 	'KR-2020-0006:00000000004': '권한 관리',
// 	'KR-2020-0006:00000000005': '권한 관리',
// 	'KR-2020-0006:00000000006': '권한 관리',
// 	tempId: '명령어 제어',
// };
// const pamPolicyDescription = {
// 	'KR-2020-0005:00000000001': '리소스 접근을 위한 권한',
// 	'KR-2020-0005:00000000002': '리소스 접근을 위한 권한',
// 	'KR-2020-0005:00000000003': '리소스 접근을 위한 권한',
// 	'KR-2020-0005:00000000004': '리소스 접근을 위한 권한',
// 	'KR-2020-0005:00000000005': '리소스 접근을 위한 권한',
// 	'KR-2020-0005:00000000006': '리소스 접근을 위한 권한',
// 	'KR-2020-0006:00000000001': '리소스 접근을 위한 권한',
// 	'KR-2020-0006:00000000002': '리소스 접근을 위한 권한',
// 	'KR-2020-0006:00000000003': '리소스 접근을 위한 권한',
// 	'KR-2020-0006:00000000004': '리소스 접근을 위한 권한',
// 	'KR-2020-0006:00000000005': '리소스 접근을 위한 권한',
// 	'KR-2020-0006:00000000006': '리소스 접근을 위한 권한',
// 	tempId: '명령어 제어 기본 정책',
// };
// const pamPolicyNmberOfRoles = {
// 	'KR-2020-0005:00000000001': 1,
// 	'KR-2020-0005:00000000002': 1,
// 	'KR-2020-0005:00000000003': 1,
// 	'KR-2020-0005:00000000004': 1,
// 	'KR-2020-0005:00000000005': 1,
// 	'KR-2020-0005:00000000006': 1,
// 	'KR-2020-0006:00000000001': 1,
// 	'KR-2020-0006:00000000002': 1,
// 	'KR-2020-0006:00000000003': 1,
// 	'KR-2020-0006:00000000004': 1,
// 	'KR-2020-0006:00000000005': 1,
// 	'KR-2020-0006:00000000006': 1,
// 	tempId: 1,
// };
// const pamPolicyCreationTime = {
// 	'KR-2020-0005:00000000001': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0005:00000000002': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0005:00000000003': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0005:00000000004': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0005:00000000005': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0005:00000000006': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0006:00000000001': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0006:00000000002': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0006:00000000003': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0006:00000000004': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0006:00000000005': '2021-11-26T20:15:21.634+09:00',
// 	'KR-2020-0006:00000000006': '2021-11-26T20:15:21.634+09:00',
// 	tempId: '2021-11-26T20:15:21.638+09:00',
// };

// const attributePolicyType = {
// 	IdentityVerification: '본인 인증 확인',
// 	MFA: 'MFA(다중인증)',
// 	AccountExpired: '계정 만료일',
// 	SignInFailBlocking: '잠금 해제일',
// };

// const calculatettribute = (attribute) => {
// 	let columns = new Array();
// 	let data = new Array();
// 	let temp = {id: 0, [DRAGGABLE_KEY]: 0};
//
// 	attribute.map((v) => {
// 		if (v.policyType === 'AlternativeAuthN') {
// 			if (v.attributeName === 'IdAndPassword') {
// 				temp.AltType = descValues(v.attributeName);
// 				temp.AlternativeAuthN = '사용하지 않음';
// 			} else {
// 				temp.AltType = '사용하지 않음';
// 				temp.AlternativeAuthN = v.attributeName;
// 			}
// 			columns.push({
// 				Header: '인증 유형',
// 				accessor: 'AltType',
// 			});
// 			columns.push({
// 				Header: '대체인증',
// 				accessor: 'AlternativeAuthN',
// 			});
// 		} else if (v.policyType === 'AccountExpired') {
// 			const tempVal = JSON.parse(v.attributeName);
// 			temp[`${tempVal.policyType}`] = tempVal.expiryDays + '일전';
// 			columns.push({
// 				Header:
// 					attributePolicyType[`${tempVal.policyType}`] ||
// 					tempVal.policyType,
// 				accessor: tempVal.policyType,
// 			});
// 		} else if (v.policyType === 'SignInFailBlocking') {
// 			const tempVal = JSON.parse(v.attributeName);
// 			temp[`${tempVal.policyType}`] =
// 				tempVal.failedCountInitDays + '일전';
// 			columns.push({
// 				Header:
// 					attributePolicyType[`${tempVal.policyType}`] ||
// 					tempVal.policyType,
// 				accessor: tempVal.policyType,
// 			});
// 		} else {
// 			temp[`${v.policyType}`] = v.attributeName;
// 			columns.push({
// 				Header: attributePolicyType[`${v.policyType}`] || v.policyType,
// 				accessor: v.policyType,
// 			});
// 		}
// 	});
// 	data.push(temp);
// 	return {columns: columns, data: data};
// };

const rolePolicyTab = {
	include: {title: '이 역할의 정책 : ', button: {delete: '연결 해제'}},
	exclude: {
		title: '이 역할의 다른 정책 : ',
		button: {create: '정책 생성', add: '정책 연결'},
	},
};

const RolePolicyTab = ({roleId, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {companyId} = useSelector(AUTH.selector);

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.roles.summary.tabs.permissions.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.roles.summary.tabs.permissions.exclude],
	);
	const [selected, setSelected] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [excludedDataIds, setExcludedDataIds] = useState([]);

	const includedData = useMemo(() => {
		return (
			includedDataIds?.map((v) => ({
				id: v.id,
				name: v.name ? v.name : '',
				type: v.type ? v.type.name : '',
				description: '',
				// description:policyDescription[v.id] || pamPolicyDescription[v.id],
				numberOfRoles: '',
				// policyNmberOfRoles[v.id] || pamPolicyNmberOfRoles[v.id],
				createdTime: v.createdTag ? v.createdTag.createdTime : '',
				[DRAGGABLE_KEY]: v.id,
				// attributes: v.attributes
				// 	? calculatettribute(v.attributes)
				// 	: null,
			})) || []
		);
	}, [includedDataIds]);

	const excludedData = useMemo(() => {
		return (
			excludedDataIds?.map((v) => ({
				id: v.id,
				name: v.name ? v.name : '',
				type: v.type ? v.type.name : '',
				description: '',
				// description:policyDescription[v.id] || pamPolicyDescription[v.id],
				numberOfRoles: '',
				// policyNmberOfRoles[v.id] || pamPolicyNmberOfRoles[v.id],
				createdTime: v.createdTag ? v.createdTag.createdTime : '',
				[DRAGGABLE_KEY]: v.id,
				// attributes: v.attributes
				// 	? calculatettribute(v.attributes)
				// 	: null,
			})) || []
		);
	}, [excludedDataIds]);

	const onClickDeleteData = useCallback(
		async (data) => {
			try {
				if (data.length) {
					await Promise.all([
						data.forEach((policyId) => {
							dispatch(
								IAM_USER_POLICY_GRANT_REVOKE_ROLE.asyncAction.revokeAction(
									{
										policyId: policyId,
										roleId: roleId,
									},
								),
							).unwrap();
						}),
					]);
					await setIncludedDataIds(
						includedDataIds.filter((v) => !data.includes(v.id)),
					);
					await setExcludedDataIds([
						...includedDataIds.filter((v) => data.includes(v.id)),
						...excludedData,
					]);
					await alert('삭제 완료');
				}
			} catch (err) {
				alert('삭제 오류');
				console.log(err);
			}
		},
		[dispatch, excludedData, includedDataIds, roleId],
	);

	const onClickAddData = useCallback(
		async (data) => {
			let order = 0;
			try {
				if (data.length) {
					await Promise.all([
						data.forEach((policyId) => {
							dispatch(
								IAM_USER_POLICY_GRANT_REVOKE_ROLE.asyncAction.grantAction(
									{
										policyId: policyId,
										roleId: roleId,
										order: order++,
									},
								),
							).unwrap();
						}),
					]);
					await setIncludedDataIds([
						...excludedDataIds.filter((v) => data.includes(v.id)),
						...includedDataIds,
					]);
					await setExcludedDataIds(
						excludedDataIds.filter((v) => !data.includes(v.id)),
					);
					alert('추가 완료');
				}
			} catch (err) {
				alert('추가 오류');
				console.log(err);
			}
		},
		[dispatch, excludedDataIds, includedDataIds, roleId],
	);

	//테이블 데이터 api 호출 (포함/비포함)
	const getApi = useCallback(async () => {
		try {
			//포함
			const includeData = await dispatch(
				IAM_USER_POLICY_GRANT_REVOKE_ROLE.asyncAction.findAllAction({
					roleId: roleId,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			//포함안함
			const excludeData = await dispatch(
				IAM_USER_POLICY_GRANT_REVOKE_ROLE.asyncAction.findAllAction({
					roleId: roleId,
					exclude: true,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			//api 요청 데이터 (포함/비포함)테이블 삽입
			await setIncludedDataIds(includeData);
			await setExcludedDataIds(excludeData);
		} catch (err) {
			alert('조회 오류');
			console.log(err);
		}
	}, [dispatch, roleId]);

	useEffect(() => {
		console.log('getApi');
		if (!isSummaryOpened) {
			getApi();
		}
	}, [getApi, isSummaryOpened]);

	useEffect(() => {
		setSelected({
			[tableKeys.roles.summary.tabs.permissions.include]: includeSelect,
			[tableKeys.roles.summary.tabs.permissions.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<TabContentContainer>
			<TableTitle>
				{rolePolicyTab.include.title}
				{includedData.length}
				<TransparentButton
					margin={'0px 0px 0px 5px'}
					onClick={() =>
						onClickDeleteData(includeSelect.map((v) => v.id))
					}
				>
					{rolePolicyTab.include.button.delete}
				</TransparentButton>
			</TableTitle>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.permissions.include}
				excludedData={excludedData}
				includedData={includedData}
				joinFunction={onClickAddData}
				disjointFunction={onClickDeleteData}
			>
				<Table
					isDraggable
					data={includedData}
					tableKey={tableKeys.roles.summary.tabs.permissions.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>
				<FoldableContainer
					title={rolePolicyTab.exclude.title + excludedData.length}
					buttons={(isDisabled) => (
						<TitleBarButtons>
							<NormalButton
								disabled={isDisabled}
								onClick={() => history.push('/policies/add')}
							>
								{rolePolicyTab.exclude.button.create}
							</NormalButton>
							<NormalButton
								margin={'0px 0px 0px 5px'}
								disabled={isDisabled}
								onClick={() =>
									onClickAddData(
										excludeSelect.map((v) => v.id),
									)
								}
							>
								{rolePolicyTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					)}
				>
					<TableOptionText data={'policies'} />
					<Table
						isDraggable
						data={excludedData}
						tableKey={
							tableKeys.roles.summary.tabs.permissions.exclude
						}
						columns={excludeColumns}
						isPaginable
						isSearchable
						isSearchFilterable
						isColumnFilterable
					/>
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

RolePolicyTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default RolePolicyTab;
