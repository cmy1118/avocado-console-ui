import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../Table/Table';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {tableColumns} from '../../../../Constants/Table/columns';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {TableTitle} from '../../../../styles/components/table';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import TableOptionText from '../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {TitleBarButtons} from '../../../../styles/components/iam/iam';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';
import IAM_USER_GROUP_TAG from '../../../../reducers/api/IAM/User/Group/tags';

const TAG_TABLE_KEY = tableKeys.groups.summary.tabs.tags.basic;
let index = 0;

const GroupOnDescPageTags = ({groupId}) => {
	const dispatch = useDispatch();
	const [tags, setTags] = useState([]);
	const [initTags, setInitTags] = useState([]);
	const [deleteTags, setDeleteTags] = useState([]);

	const tableData = useMemo(
		() =>
			tags.map((v) => ({
				...v,
				[DRAGGABLE_KEY]: v.name || v[DRAGGABLE_KEY],
			})),
		[tags],
	);

	const [select, columns] = useSelectColumn(
		tableColumns[TAG_TABLE_KEY],
		tableData,
	);

	const onClickAddRow = useCallback(() => {
		const lastValues = tags.slice().pop();
		//	console.log(lastValues);
		if (lastValues.name === '' || lastValues.value === '') {
			alert('입력하지 않은 값이 있습니다.');
			return;
		}
		setTags((prev) => [
			...prev,
			{
				[DRAGGABLE_KEY]: `${TAG_TABLE_KEY}` + index++,
				name: '',
				value: '',
				permissions: [],
			},
		]);
	}, [tags]);

	const onClickSaveRow = useCallback(async () => {
		console.log(tags);
		const newTags = tags.filter((v) => v[DRAGGABLE_KEY]);
		const prevTags = tags.filter((v) => !v[DRAGGABLE_KEY]);

		// memo 업데이트 api 보류
		// const updatedTags = initTags.filter(v=>)
		console.log(newTags);
		if (newTags.find((v) => v.name === '' || v.value === '')) {
			alert('입력하지 않은 값이 있습니다.');
			return;
		}
		for await (let v of newTags) {
			dispatch(
				IAM_USER_GROUP_TAG.asyncAction.createAction({
					groupId: groupId,
					name: v.name,
					value: v.value,
				}),
			);
		}

		console.log(deleteTags);

		for await (let v of deleteTags) {
			dispatch(
				IAM_USER_GROUP_TAG.asyncAction.deleteAction({
					groupId: groupId,
					name: v.name,
				}),
			);
		}

		console.log(initTags);
	}, [dispatch, deleteTags, groupId, initTags, tags]);

	const onClickDeleteRow = useCallback(() => {
		if (select.length) {
			console.log(select);
			console.log(tags);

			setDeleteTags((prev) => [
				...prev,
				...select.filter((v) => v[DRAGGABLE_KEY]),
			]);

			const result = tags.filter(
				(v) => !select.map((s) => s.name).includes(v.name),
			);
			console.log(result);
			setTags(result);
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [tags, select]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await dispatch(
					IAM_USER_GROUP_TAG.asyncAction.getsAction({
						groupId: groupId,
						range: 'elements=0-50',
					}),
				);

				setTags(res.payload.data);
				setInitTags(res.payload.data);
				// setTags(dummy);
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
				data={tableData}
				columns={columns}
				setData={setTags}
			/>
		</TabContentContainer>
	);
};

GroupOnDescPageTags.propTypes = {
	groupId: PropTypes.string,
};

export default GroupOnDescPageTags;
