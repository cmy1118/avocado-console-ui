import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import Table from '../../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import DragContainer from '../../../../Table/DragContainer';
import {TableTitle} from '../../../../../styles/components/table';
import TableFold from '../../../../Table/Options/TableFold';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../styles/components/iam/iamTab';
import {
	FoldableContainer,
	TitleBarButtons,
} from '../../../../../styles/components/iam/iam';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../../../reducers/api/IAM/User/Role/roles';
import PAM_ROLES from '../../../../../reducers/api/PAM/Role/roles';
import {CollapsbleContent} from '../../../../../styles/components/style';
import {descValues} from '../../../../../utils/tableDataConverter';
import AUTH from '../../../../../reducers/api/Auth/auth';
import {account} from '../../../../../utils/auth';

const policyType = {
	'KR-2020-0005:202111:0001': '사용자 인증',
	'KR-2020-0005:202111:0002': '사용자 인증',
	'KR-2020-0005:202111:0003': '사용자 인증',
	'KR-2020-0005:202111:0004': '본인 인증',
	'KR-2020-0005:202111:0005': '기본 인증',
	'KR-2020-0005:202111:0006': '계정 만료',
	'KR-2020-0005:202111:0007': '잠금 해제',
	'KR-2020-0006:202111:0001': '사용자 인증',
	'KR-2020-0006:202111:0002': '사용자 인증',
	'KR-2020-0006:202111:0003': '사용자 인증',
	'KR-2020-0006:202111:0004': '본인 인증',
	'KR-2020-0006:202111:0005': '기본 인증',
	'KR-2020-0006:202111:0006': '계정 만료',
	'KR-2020-0006:202111:0007': '잠금 해제',
};
const policyDescription = {
	'KR-2020-0005:202111:0001': '기본 인증 정책',
	'KR-2020-0005:202111:0002': 'Social 인증 정책',
	'KR-2020-0005:202111:0003': 'MFA 인증 정책',
	'KR-2020-0005:202111:0004': '본인 여부를 확인하기 위한 인증 정책',
	'KR-2020-0005:202111:0005': '기본 인증 정책',
	'KR-2020-0005:202111:0006': '사용자 계정 만료 정책',
	'KR-2020-0005:202111:0007': '로그인 N회 실패시 잠금 정책',
	'KR-2020-0006:202111:0001': '기본 인증 정책',
	'KR-2020-0006:202111:0002': 'Social 인증 정책',
	'KR-2020-0006:202111:0003': 'MFA 인증 정책',
	'KR-2020-0006:202111:0004': '본인 여부를 확인하기 위한 인증 정책',
	'KR-2020-0006:202111:0005': '기본 인증 정책',
	'KR-2020-0006:202111:0006': '사용자 계정 만료 정책',
	'KR-2020-0006:202111:0007': '로그인 N회 실패시 잠금 정책',
};
const policyNmberOfRoles = {
	'KR-2020-0005:202111:0001': 3,
	'KR-2020-0005:202111:0002': 1,
	'KR-2020-0005:202111:0003': 2,
	'KR-2020-0005:202111:0004': 3,
	'KR-2020-0005:202111:0005': 1,
	'KR-2020-0005:202111:0006': 1,
	'KR-2020-0005:202111:0007': 1,
	'KR-2020-0006:202111:0001': 3,
	'KR-2020-0006:202111:0002': 1,
	'KR-2020-0006:202111:0003': 2,
	'KR-2020-0006:202111:0004': 3,
	'KR-2020-0006:202111:0005': 1,
	'KR-2020-0006:202111:0006': 1,
	'KR-2020-0006:202111:0007': 1,
};

const policyCreationTime = {
	'KR-2020-0005:202111:0001': '2021-11-26T19:13:16.446+09:00',
	'KR-2020-0005:202111:0002': '2021-11-26T19:13:21.266+09:00',
	'KR-2020-0005:202111:0003': '2021-11-26T19:14:01.500+09:00',
	'KR-2020-0005:202111:0004': '2021-11-26T20:09:13.240+09:00',
	'KR-2020-0005:202111:0005': '2021-11-26T21:21:24.401+09:00',
	'KR-2020-0005:202111:0006': '2021-11-26T21:13:16.630+09:00',
	'KR-2020-0005:202111:0007': '2021-11-26T23:32:12.420+09:00',
	'KR-2020-0006:202111:0001': '2021-11-26T19:13:16.446+09:00',
	'KR-2020-0006:202111:0002': '2021-11-26T19:13:21.266+09:00',
	'KR-2020-0006:202111:0003': '2021-11-26T19:14:01.500+09:00',
	'KR-2020-0006:202111:0004': '2021-11-26T20:09:13.240+09:00',
	'KR-2020-0006:202111:0005': '2021-11-26T21:21:24.401+09:00',
	'KR-2020-0006:202111:0006': '2021-11-26T21:13:16.630+09:00',
	'KR-2020-0006:202111:0007': '2021-11-26T23:32:12.420+09:00',
};

const pamPolicyType = {
	'KR-2020-0005:00000000001': '권한 관리',
	'KR-2020-0005:00000000002': '권한 관리',
	'KR-2020-0005:00000000003': '권한 관리',
	'KR-2020-0005:00000000004': '권한 관리',
	'KR-2020-0005:00000000005': '권한 관리',
	'KR-2020-0005:00000000006': '권한 관리',
	'KR-2020-0006:00000000001': '권한 관리',
	'KR-2020-0006:00000000002': '권한 관리',
	'KR-2020-0006:00000000003': '권한 관리',
	'KR-2020-0006:00000000004': '권한 관리',
	'KR-2020-0006:00000000005': '권한 관리',
	'KR-2020-0006:00000000006': '권한 관리',
	tempId: '명령어 제어',
};
const pamPolicyDescription = {
	'KR-2020-0005:00000000001': '리소스 접근을 위한 권한',
	'KR-2020-0005:00000000002': '리소스 접근을 위한 권한',
	'KR-2020-0005:00000000003': '리소스 접근을 위한 권한',
	'KR-2020-0005:00000000004': '리소스 접근을 위한 권한',
	'KR-2020-0005:00000000005': '리소스 접근을 위한 권한',
	'KR-2020-0005:00000000006': '리소스 접근을 위한 권한',
	'KR-2020-0006:00000000001': '리소스 접근을 위한 권한',
	'KR-2020-0006:00000000002': '리소스 접근을 위한 권한',
	'KR-2020-0006:00000000003': '리소스 접근을 위한 권한',
	'KR-2020-0006:00000000004': '리소스 접근을 위한 권한',
	'KR-2020-0006:00000000005': '리소스 접근을 위한 권한',
	'KR-2020-0006:00000000006': '리소스 접근을 위한 권한',
	tempId: '명령어 제어 기본 정책',
};
const pamPolicyNmberOfRoles = {
	'KR-2020-0005:00000000001': 1,
	'KR-2020-0005:00000000002': 1,
	'KR-2020-0005:00000000003': 1,
	'KR-2020-0005:00000000004': 1,
	'KR-2020-0005:00000000005': 1,
	'KR-2020-0005:00000000006': 1,
	'KR-2020-0006:00000000001': 1,
	'KR-2020-0006:00000000002': 1,
	'KR-2020-0006:00000000003': 1,
	'KR-2020-0006:00000000004': 1,
	'KR-2020-0006:00000000005': 1,
	'KR-2020-0006:00000000006': 1,
	tempId: 1,
};
const pamPolicyCreationTime = {
	'KR-2020-0005:00000000001': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0005:00000000002': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0005:00000000003': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0005:00000000004': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0005:00000000005': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0005:00000000006': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0006:00000000001': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0006:00000000002': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0006:00000000003': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0006:00000000004': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0006:00000000005': '2021-11-26T20:15:21.634+09:00',
	'KR-2020-0006:00000000006': '2021-11-26T20:15:21.634+09:00',
	tempId: '2021-11-26T20:15:21.638+09:00',
};

const attributePolicyType = {
	IdentityVerification: '본인 인증 확인',
	MFA: 'MFA(다중인증)',
	AccountExpired: '계정 만료일',
	SignInFailBlocking: '잠금 해제일',
};

const calculatettribute = (attribute) => {
	let columns = new Array();
	let data = new Array();
	let temp = {id: 0, [DRAGGABLE_KEY]: 0};

	attribute.map((v) => {
		if (v.policyType === 'AlternativeAuthN') {
			if (v.attributeName === 'IdAndPassword') {
				temp.AltType = descValues(v.attributeName);
				temp.AlternativeAuthN = '사용하지 않음';
			} else {
				temp.AltType = '사용하지 않음';
				temp.AlternativeAuthN = v.attributeName;
			}
			columns.push({
				Header: '인증 유형',
				accessor: 'AltType',
			});
			columns.push({
				Header: '대체인증',
				accessor: 'AlternativeAuthN',
			});
		} else if (v.policyType === 'AccountExpired') {
			const tempVal = JSON.parse(v.attributeName);
			temp[`${tempVal.policyType}`] = tempVal.expiryDays + '일전';
			columns.push({
				Header:
					attributePolicyType[`${tempVal.policyType}`] ||
					tempVal.policyType,
				accessor: tempVal.policyType,
			});
		} else if (v.policyType === 'SignInFailBlocking') {
			const tempVal = JSON.parse(v.attributeName);
			temp[`${tempVal.policyType}`] =
				tempVal.failedCountInitDays + '일전';
			columns.push({
				Header:
					attributePolicyType[`${tempVal.policyType}`] ||
					tempVal.policyType,
				accessor: tempVal.policyType,
			});
		} else {
			temp[`${v.policyType}`] = v.attributeName;
			columns.push({
				Header: attributePolicyType[`${v.policyType}`] || v.policyType,
				accessor: v.policyType,
			});
		}
	});
	data.push(temp);
	return {columns: columns, data: data};
};

const RolePolicyTab = ({roleId, space, isFold, setIsFold, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const [select, setSelect] = useState({});
	const {companyId} = useSelector(AUTH.selector);
	const [includedDataIds, setIncludedDataIds] = useState([]);

	const [inPolicy, setInPolicy] = useState(null);
	const [exPolicy, setExPolicy] = useState(null);

	const includedData = useMemo(() => {
		return (
			inPolicy?.map((v) => ({
				id: v.id,
				name: v.name,
				type: policyType[v.id] || pamPolicyType[v.id],
				description:
					policyDescription[v.id] || pamPolicyDescription[v.id],
				numberOfRoles:
					policyNmberOfRoles[v.id] || pamPolicyNmberOfRoles[v.id],
				createdTime:
					policyCreationTime[v.id] || pamPolicyCreationTime[v.id],
				[DRAGGABLE_KEY]: v.id,
				attributes: v.attributes
					? calculatettribute(v.attributes)
					: null,
			})) || []
		);
	}, [inPolicy]);

	const excludedData = useMemo(() => {
		return (
			exPolicy?.map((v) => ({
				id: v.id,
				name: v.name,
				type: policyType[v.id] || pamPolicyType[v.id],
				description:
					policyDescription[v.id] || pamPolicyDescription[v.id],
				numberOfRoles:
					policyNmberOfRoles[v.id] || pamPolicyNmberOfRoles[v.id],
				createdTime:
					policyCreationTime[v.id] || pamPolicyNmberOfRoles[v.id],
				[DRAGGABLE_KEY]: v.id,
				attributes: v.attributes
					? calculatettribute(v.attributes)
					: null,
			})) || []
		);
	}, [exPolicy]);

	//역할에 포함 정책 템플릿을 조회한다.
	useEffect(() => {
		if (!isSummaryOpened) {
			// iamList();
			let inPolicies = [];

			dispatch(
				IAM_ROLES.asyncAction.findTemplatesAction({
					roleId: roleId,
					range: 'elements=0-50',
					include: 't',
				}),
			)
				.unwrap()
				.then((res) => {
					// console.log(res.data);
					inPolicies.push.apply(inPolicies, res.data);
				})
				.then(() => {
					dispatch(
						PAM_ROLES.asyncAction.getAllRolesAction({
							id: roleId,
							range: 'elements=0-50',
						}),
					)
						.unwrap()
						.then((r) => {
							if (r.data.length > 0) {
								inPolicies.push.apply(inPolicies, r.data);
								if (companyId === account.KT.companyId) {
									inPolicies.push({
										id: 'tempId',
										[DRAGGABLE_KEY]: 'tempId',
										name: 'commandContorl-policy',
									});
								}
								if (companyId === account.SK.companyId) {
									inPolicies.push({
										id: 'tempId',
										[DRAGGABLE_KEY]: 'tempId',
										name: 'commandContorl-policy',
									});
								}
							}
						})
						.then(() => {
							console.log('setInPolicy', inPolicies);
							setInPolicy(inPolicies);
						});
				})
				.then(() => {
					dispatch(
						IAM_ROLES.asyncAction.findTemplatesAction({
							roleId: roleId,
							range: 'elements=0-50',
							include: 'f',
						}),
					)
						.unwrap()
						.then((res) => {
							setExPolicy(res.data);
						});
				});
		}
	}, [
		dispatch,
		roleId,
		isSummaryOpened,
		setInPolicy,
		setExPolicy,
		companyId,
	]);

	return (
		<TabContentContainer>
			<TableTitle>
				이 역할의 정책: {includedData.length}
				<TransparentButton margin={'0px 0px 0px 5px'}>
					연결 해제
				</TransparentButton>
			</TableTitle>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.permissions.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<Table
					setSelect={setSelect}
					isDraggable
					data={includedData}
					tableKey={tableKeys.roles.summary.tabs.permissions.include}
					columns={
						tableColumns[
							tableKeys.roles.summary.tabs.permissions.include
						]
					}
					tableOptions={{show: true}}
				/>
				<FoldableContainer>
					<TableFold
						title={<>이 역할의 다른 정책: {excludedData.length}</>}
						space={'RolePolicyTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<TitleBarButtons>
							<NormalButton>정책 생성</NormalButton>
							<NormalButton margin={'0px 0px 0px 5px'}>
								정책 연결
							</NormalButton>
						</TitleBarButtons>
					</TableFold>
					<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
						<TableOptionText data={'policies'} />
						<Table
							setSelect={setSelect}
							isDraggable
							data={excludedData}
							tableKey={
								tableKeys.roles.summary.tabs.permissions.exclude
							}
							columns={
								tableColumns[
									tableKeys.roles.summary.tabs.permissions
										.exclude
								]
							}
						/>
					</CollapsbleContent>
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
