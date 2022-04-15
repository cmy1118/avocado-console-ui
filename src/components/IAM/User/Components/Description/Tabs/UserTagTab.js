import React, {useCallback, useEffect, useRef, useState} from 'react';
import Table from '../../../../../Table/Table';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER from '../../../../../../reducers/api/IAM/User/User/user';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../../styles/components/buttons';
import {
	TableTitle,
	TabTableTitle,
} from '../../../../../../styles/components/table';
import TableOptionText from '../../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {
	IncludeTableContainer,
	TitleBarButtons,
} from '../../../../../../styles/components/iam/iam';
import IAM_USER_TAG from '../../../../../../reducers/api/IAM/User/Tag/tags';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import DragContainer from '../../../../../Table/DragContainer';
import FoldableContainer from '../../../../../Table/Options/FoldableContainer';
import IAM_GRANT_REVOKE_TAG from '../../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/grantRevokeTag';
import {ATTRIBUTE_TYPES} from '../../../../../../utils/policy/policy';
import {totalNumberConverter} from '../../../../../../utils/tableDataConverter';
import {IamTabSectionContents} from '../../../../../../styles/components/iam/addPage';

const UserTagTab = ({userUid, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const tableRefs = useRef([]);
	const [user, setUser] = useState(null);
	const [data, setData] = useState([]);

	const [basicSelect, basicColumns] = useSelectColumn(
		tableColumns[tableKeys.users.summary.tabs.tags.basic],
		data,
	);

	const [deleteList, setDeleteList] = useState([]);

	const [includePoliciesIds, setIncludePoliciesIds] = useState([]);
	const [includePolicies, setIncludePolicies] = useState([]);
	const [excludePolicies, setExcludePolicies] = useState([]);

	const [policiesInfo, setPoliciesInfo] = useState({
		name: '',
		includeCount: 0,
		excludeCount: 0,
	});

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.summary.tabs.tags.permissions.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.summary.tabs.tags.permissions.exclude],
	);
	const [selected, setSelected] = useState({});

	const handleCellClick = useCallback(
		async (cell) => {
			if (cell.row.original.new) return;

			if (cell.column.id === 'name') {
				console.log(cell);

				try {
					const includeRes = await dispatch(
						IAM_GRANT_REVOKE_TAG.asyncAction.findAllAction({
							tagName: cell.row.original.name,
							range: 'elements=0-50',
							value: cell.row.original.name,
							attributeType: ATTRIBUTE_TYPES.USER,
						}),
					);

					console.log(includeRes.payload.data);

					setIncludePolicies(
						includeRes.payload.data.map((v) => ({
							...v,
							type: 'IAM',
							createdTime: v.createdTag.createdTime,
							[DRAGGABLE_KEY]: v.id,
						})),
					);

					const excludeRes = await dispatch(
						IAM_GRANT_REVOKE_TAG.asyncAction.findAllAction({
							exclude: true,
							tagName: cell.row.original.name,
							range: 'elements=0-50',
							value: cell.row.original.name,
							attributeType: ATTRIBUTE_TYPES.USER,
						}),
					);

					setExcludePolicies(
						excludeRes.payload.data.map((v) => ({
							...v,
							type: 'IAM',
							createdTime: v.createdTag.createdTime,
							[DRAGGABLE_KEY]: v.id,
						})),
					);

					setPoliciesInfo({
						name: cell.row.original.name,
						includeCount: totalNumberConverter(
							includeRes.payload.headers['content-range'],
						),
						excludeCount: totalNumberConverter(
							excludeRes.payload.headers['content-range'],
						),
					});
				} catch (err) {
					console.error(err);
				}
			}
		},
		[dispatch],
	);

	const onClickAddRow = useCallback(() => {
		setData([
			...data,
			{
				new: true,
				name: '',
				value: '',
				permissions: [],
				numberOfPermissions: 0,
				[DRAGGABLE_KEY]: `${tableKeys.users.summary.tabs.tags.basic} ${data.length}`,
			},
		]);
	}, [data]);

	const onClickSaveRow = useCallback(() => {
		if (data.length) {
			data.forEach((v) => {
				if (v.new)
					dispatch(
						IAM_USER_TAG.asyncAction.createAction({
							userUid,
							name: v.name,
							value: v.value,
						}),
					);
			});
			deleteList.forEach((v) => {
				dispatch(
					IAM_USER_TAG.asyncAction.deleteAction({
						userUid,
						name: v.name,
					}),
				);
			});
		}
	}, [data, deleteList, dispatch, userUid]);

	const onClickDeleteRow = useCallback(() => {
		if (basicSelect.length) {
			setDeleteList((prev) => [
				...prev,
				...basicSelect.filter((v) => !v.new),
			]);
			setData(
				data.filter(
					(v) =>
						!basicSelect
							.map((x) => JSON.stringify(x))
							.includes(JSON.stringify(v)),
				),
			);
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [data, basicSelect]);

	useEffect(() => {
		if (!user && !isSummaryOpened) {
			dispatch(
				IAM_USER.asyncAction.findByUidAction({
					userUid,
				}),
			)
				.unwrap()
				.then((user) => {
					setUser(user);
					setData(
						user.tags
							? user.tags.map((tag) => ({
									...tag,
									id: tag.name,
									numberOfPermissions: 0,
									[DRAGGABLE_KEY]: tag.name,
							  }))
							: [],
					);
				});
		}
	}, [dispatch, isSummaryOpened, user, userUid]);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const res = await dispatch(
	// 				IAM_GRANT_REVOKE_TAG.asyncAction.findAllAction({
	// 					exclude: true,
	// 					tagName: 'tagName',
	// 					range: 'elements=0-50',
	// 					value: 'd',
	// 					attributeType: ATTRIBUTE_TYPES.USER,
	// 				}),
	// 			);
	//
	// 			console.log(res.payload.data);
	// 			setExTag(res.payload.data);
	// 			// setTags(dummy);
	// 		} catch (err) {
	// 			console.error(err);
	// 		}
	// 	};
	// 	fetchData();
	// }, [dispatch]);

	return (
		<TabContentContainer>
			<IncludeTableContainer>
				<TabTableTitle>
					태그 추가
					<TitleBarButtons>
						<NormalButton onClick={onClickAddRow}>
							태그 추가
						</NormalButton>
						<NormalButton onClick={onClickSaveRow}>
							태그 저장
						</NormalButton>
						<TransparentButton
							margin='0px 0px 0px 5px'
							onClick={onClickDeleteRow}
						>
							태그 삭제
						</TransparentButton>
					</TitleBarButtons>
				</TabTableTitle>
				<TableOptionText data={'tags'} />

				<Table
					tableKey={tableKeys.users.summary.tabs.tags.basic}
					data={data}
					setData={setData}
					columns={basicColumns}
					tableRefs={tableRefs}
					cellClick={handleCellClick}
				/>
			</IncludeTableContainer>
			<DragContainer
				selected={selected}
				data={includePoliciesIds}
				setData={setIncludePoliciesIds}
				includedKey={
					tableKeys.users.summary.tabs.tags.permissions.include
				}
				excludedData={excludePolicies}
				includedData={includePolicies}
			>
				<IncludeTableContainer>
					<TabTableTitle>{`태그 [${policiesInfo.name}] 의 정책 : ${policiesInfo.includeCount}`}</TabTableTitle>
					<Table
						isDraggable
						data={includePolicies}
						tableKey={
							tableKeys.users.summary.tabs.tags.permissions
								.include
						}
						columns={includeColumns}
						isPaginable
						isSearchable
						isSearchFilterable
						isColumnFilterable
					/>
				</IncludeTableContainer>

				<FoldableContainer
					title={`태그 [${policiesInfo.name}] 의 다른 정책 : ${policiesInfo.excludeCount}`}
					buttons={(isDisabled) => (
						<TitleBarButtons>
							<NormalButton
								margin={'0px 0px 0px 5px'}
								disabled={isDisabled}
							>
								{'추가'}
							</NormalButton>
						</TitleBarButtons>
					)}
					type={'tab'}
				>
					<IamTabSectionContents>
						<Table
							isDraggable
							data={excludePolicies}
							tableKey={
								tableKeys.users.summary.tabs.tags.permissions
									.exclude
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

UserTagTab.propTypes = {
	userUid: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default UserTagTab;
