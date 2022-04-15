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
import {
	TableTitle,
	TabTableTitle,
} from '../../../../../../styles/components/table';
import FoldableContainer from '../../../../../Table/Options/FoldableContainer';
import TableOptionText from '../../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {
	IncludeTableContainer,
	TitleBarButtons,
} from '../../../../../../styles/components/iam/iam';
import {useDispatch, useSelector} from 'react-redux';
import AUTH from '../../../../../../reducers/api/Auth/auth';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import IAM_USER_POLICY_GRANT_REVOKE_ROLE from '../../../../../../reducers/api/IAM/User/Policy/GrantRevoke/role';
import {useHistory} from 'react-router-dom';
import {IamTabSectionContents} from '../../../../../../styles/components/iam/addPage';

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
				<IncludeTableContainer>
					<TabTableTitle>
						{rolePolicyTab.include.title}
						{includedData.length}
						<TransparentButton
							margin={'0px 0px 0px 5px'}
							onClick={() =>
								onClickDeleteData(
									includeSelect.map((v) => v.id),
								)
							}
						>
							{rolePolicyTab.include.button.delete}
						</TransparentButton>
					</TabTableTitle>
					<Table
						isDraggable
						data={includedData}
						tableKey={
							tableKeys.roles.summary.tabs.permissions.include
						}
						columns={includeColumns}
						isPaginable
						isSearchable
						isSearchFilterable
						isColumnFilterable
					/>
				</IncludeTableContainer>

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
					type={'tab'}
				>
					<IamTabSectionContents>
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
					</IamTabSectionContents>
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
