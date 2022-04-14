import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Table from '../../../../../Table/Table';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../../Constants/Table/keys';
import {TableTitle} from '../../../../../../styles/components/table';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../../styles/components/buttons';
import TableOptionText from '../../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {TitleBarButtons} from '../../../../../../styles/components/iam/iam';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import IAM_USER_GROUP_TAG from '../../../../../../reducers/api/IAM/User/Group/tags';
import DragContainer from '../../../../../Table/DragContainer';
import FoldableContainer from '../../../../../Table/Options/FoldableContainer';
import IAM_GRANT_REVOKE_TAG from '../../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/grantRevokeTag';
import {ATTRIBUTE_TYPES} from '../../../../../../utils/policy/policy';
import {totalNumberConverter} from '../../../../../../utils/tableDataConverter';

const TAG_TABLE_KEY = tableKeys.groups.summary.tabs.tags.basic;
const ROLE_INCLUDE_KEY = tableKeys.groups.summary.tabs.tags.permissions.include;
const ROLE_EXCLUDE_KEY = tableKeys.groups.summary.tabs.tags.permissions.exclude;
let index = 0;

const GroupTagTab = ({groupId}) => {
	const tableRefs = useRef([]);
	const dispatch = useDispatch();
	const [tags, setTags] = useState([]);

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
		tableColumns[ROLE_INCLUDE_KEY],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[ROLE_EXCLUDE_KEY],
	);
	const [selected, setSelected] = useState({});

	// const tableData = useMemo(
	// 	() =>
	// 		tags.map((v) => ({
	// 			...v,
	// 			[DRAGGABLE_KEY]: v.name || v[DRAGGABLE_KEY],
	// 		})),
	// 	[tags],
	// );

	const [select, columns] = useSelectColumn(
		tableColumns[TAG_TABLE_KEY],
		tags,
	);

	console.log(tags);

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
		setTags((prev) => [
			...prev,
			{
				new: true,
				[DRAGGABLE_KEY]: `${TAG_TABLE_KEY}` + index++,
				name: '',
				value: '',
				permissions: [],
			},
		]);
	}, []);

	const onClickSaveRow = useCallback(async () => {
		console.log(tags);
		if (tags.length) {
			for await (let v of tags) {
				if (v.new) {
					console.log(v);
					dispatch(
						IAM_USER_GROUP_TAG.asyncAction.createAction({
							groupId: groupId,
							name: v.name,
							value: v.value,
						}),
					);
				}
			}

			console.log(deleteList);

			for await (let v of deleteList) {
				dispatch(
					IAM_USER_GROUP_TAG.asyncAction.deleteAction({
						groupId: groupId,
						name: v.name,
					}),
				);
			}
		}
	}, [tags, dispatch, groupId, deleteList]);

	const onClickDeleteRow = useCallback(() => {
		if (select.length) {
			setDeleteList((prev) => [...prev, ...select.filter((v) => !v.new)]);

			const result = tags.filter(
				(v) =>
					!select
						.map((s) => JSON.stringify(s))
						.includes(JSON.stringify(v)),
			);
			console.log(result);
			setTags(result);
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [tags, select]);

	useEffect(() => {
		setSelected({
			[ROLE_INCLUDE_KEY]: includeSelect,
			[ROLE_EXCLUDE_KEY]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await dispatch(
					IAM_USER_GROUP_TAG.asyncAction.getsAction({
						groupId: groupId,
						range: 'elements=0-50',
					}),
				);

				console.log(res.payload.data);
				setTags(
					res.payload.data.map((v) => ({
						...v,
						[DRAGGABLE_KEY]: v.name,
					})),
				);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [dispatch, groupId]);

	return (
		<TabContentContainer>
			<TableTitle>
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
			</TableTitle>
			<TableOptionText data={'tags'} />
			<Table
				tableKey={TAG_TABLE_KEY}
				data={tags}
				columns={columns}
				setData={setTags}
				tableRefs={tableRefs}
				cellClick={handleCellClick}
			/>

			<TableTitle>{`태그 [${policiesInfo.name}] 의 정책 : ${policiesInfo.includeCount}`}</TableTitle>
			<DragContainer
				selected={selected}
				data={includePoliciesIds}
				setData={setIncludePoliciesIds}
				includedKey={ROLE_INCLUDE_KEY}
				excludedData={excludePolicies}
				includedData={includePolicies}
			>
				<Table
					isDraggable
					data={includePolicies}
					tableKey={ROLE_INCLUDE_KEY}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>

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
				>
					<Table
						isDraggable
						data={excludePolicies}
						tableKey={ROLE_EXCLUDE_KEY}
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

GroupTagTab.propTypes = {
	groupId: PropTypes.string,
};

export default GroupTagTab;
