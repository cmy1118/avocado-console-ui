import PropTypes from 'prop-types';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {TableTitle} from '../../../../../../styles/components/table';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../../../../styles/components/buttons';
import React, {useCallback, useEffect, useState} from 'react';
import {TitleBarButtons} from '../../../../../../styles/components/iam/iam';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import Table from '../../../../../Table/Table';
import DragContainer from '../../../../../Table/DragContainer';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import IAM_GRAN_REVOKE_ROLE from '../../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/grantRevokeRole';
import {isFulfilled} from '../../../../../../utils/redux';
import {useDispatch} from 'react-redux';
import FoldableContainer from '../../../../../Table/Options/FoldableContainer';

const policyRoleTab = {
	include: {
		title: '이 정책과 연결된 역할 :',
		button: {delete: '삭제'},
	},
	exclude: {
		title: '이 정책의 다른 역할 :',
		button: {add: '역할 추가'},
	},
};

/**************************************************
 * ambacc244 - api 호출 받은 role정보를 현 페이지의 테이블에 알맞게 수정
 *
 * data (array) : api로 호출 받은 role 정보
 **************************************************/
const convertTableData = (data) => {
	return (data || []).map((v) => ({
		...v,
		type: v.type.name,
		maxGrants: v.maxGrants || '제한 없음',
		grantUser: {
			name: v.createdTag.userName,
			id: v.createdTag.userId,
			userUid: v.createdTag.userUid,
		},
		[DRAGGABLE_KEY]: v.id,
	}));
};

const PolicyRoleTab = ({policyId}) => {
	const dispatch = useDispatch();

	const [inRoleIds, setInRoleIds] = useState([]);
	//inRoles : 현 정책이 부여된 roles
	const [inRoles, setInRoles] = useState([]);
	//inRoles : 현 정책이 부여되지 않은 roles
	const [exRoles, setExRoles] = useState([]);
	const [selected, setSelected] = useState({});
	//inSelectedRoles : 현 정책이 부여된 roles중 선택된 roles
	const [inSelectedRoles, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.policy.summary.tabs.role.include],
	);
	//exSelectedRoles : 현 정책이 부여되지 않은 roles중 선택된 roles
	const [exSelectedRoles, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.policy.summary.tabs.role.exclude],
	);

	/**************************************************
	 * ambacc244 - 현 policy가 부여된 role들을 불러오기
	 **************************************************/
	const getIncludedRolesByPolicy = useCallback(async () => {
		const include = await dispatch(
			IAM_GRAN_REVOKE_ROLE.asyncAction.findAllRoleByPolicyId({
				policyId: policyId,
			}),
		);

		if (isFulfilled(include)) {
			const includeData = convertTableData(include.payload);
			setInRoles(includeData);
		}
	}, [dispatch, policyId]);

	/**************************************************
	 * ambacc244 - 현 policy가 부여되지 않은 role들을 불러오기
	 **************************************************/
	const getExcludedRolesByPolicy = useCallback(async () => {
		const exclude = await dispatch(
			IAM_GRAN_REVOKE_ROLE.asyncAction.findAllRoleByPolicyId({
				policyId: policyId,
				exclude: true,
			}),
		);

		if (isFulfilled(exclude)) {
			const excludeData = convertTableData(exclude.payload);
			setExRoles(excludeData);
		}
	}, [dispatch, policyId]);

	/**************************************************
	 * ambacc244 - 선택한 role들에 현 policy 부여 해제
	 **************************************************/
	const onClickRevokeRoles = useCallback(() => {
		inSelectedRoles.map(async (v) => {
			await dispatch(
				IAM_GRAN_REVOKE_ROLE.asyncAction.revokeRolePolicy({
					policyId: policyId,
					roleId: v.id,
				}),
			);
		});

		setExRoles([...inSelectedRoles, ...exRoles]);
		setInRoles(inRoles.filter((v) => !inSelectedRoles.includes(v)));
	}, [
		dispatch,
		getExcludedRolesByPolicy,
		inRoles,
		exRoles,
		inSelectedRoles,
		policyId,
	]);

	/**************************************************
	 * ambacc244 - 선택한 role들에 현 policy 부여
	 **************************************************/
	const onClickGrantRoles = useCallback(async () => {
		exSelectedRoles.map(async (v) => {
			await dispatch(
				IAM_GRAN_REVOKE_ROLE.asyncAction.grantRolePolicy({
					policyId: policyId,
					roleId: v.id,
					order: 0,
				}),
			);
		});

		setInRoles([...exSelectedRoles, ...inRoles]);
		setExRoles(exRoles.filter((v) => !exSelectedRoles.includes(v)));
	}, [
		dispatch,
		exSelectedRoles,
		getIncludedRolesByPolicy,
		policyId,
		exRoles,
		inRoles,
	]);

	/**************************************************
	 * seb
	 **************************************************/
	useEffect(() => {
		setSelected({
			[tableKeys.policy.summary.tabs.role.include]: inSelectedRoles,
			[tableKeys.policy.summary.tabs.role.exclude]: exSelectedRoles,
		});
	}, [exSelectedRoles, inSelectedRoles]);

	/**************************************************
	 * ambacc244 - role 탭이 열리면 이 policy가 부여된/부여되지 않은 role을 불러옴
	 **************************************************/
	useEffect(() => {
		getIncludedRolesByPolicy();
		getExcludedRolesByPolicy();
	}, [getExcludedRolesByPolicy, getIncludedRolesByPolicy]);

	return (
		<TabContentContainer>
			<TableTitle>
				{policyRoleTab.include.title + inRoles.length}
				<NormalBorderButton
					onClick={onClickRevokeRoles}
					margin={'0px 0px 0px 5px'}
				>
					{policyRoleTab.include.button.delete}
				</NormalBorderButton>
			</TableTitle>

			<DragContainer
				selected={selected}
				data={inRoleIds}
				setData={setInRoleIds}
				includedKey={tableKeys.policy.summary.tabs.role.include}
				excludedData={exRoles}
				includedData={inRoles}
				joinFunction={onClickGrantRoles}
				disjointFunction={onClickRevokeRoles}
			>
				<Table
					isDraggable
					data={inRoles}
					tableKey={tableKeys.policy.summary.tabs.role.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>

				<FoldableContainer
					title={policyRoleTab.include.title + exRoles.length}
					buttons={(isDisabled) => (
						<TitleBarButtons>
							<NormalButton
								onClick={onClickGrantRoles}
								margin={'0px 0px 0px 5px'}
								disabled={isDisabled}
							>
								{policyRoleTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					)}
				>
					<Table
						isDraggable
						data={exRoles}
						tableKey={tableKeys.policy.summary.tabs.role.exclude}
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

PolicyRoleTab.propTypes = {
	policyId: PropTypes.string.isRequired,
};

export default PolicyRoleTab;
