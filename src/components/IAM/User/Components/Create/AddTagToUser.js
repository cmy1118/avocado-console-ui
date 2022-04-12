import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import useSelectColumn from '../../../../../hooks/table/useSelectColumn';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import FoldableContainer from '../../../../Table/Options/FoldableContainer';
import {TitleBarButtons} from '../../../../../styles/components/iam/iam';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import Table from '../../../../Table/Table';

let newRowIndex = 0;
const AddTagToUser = () => {
	const tableRefs = useRef([]);

	const dispatch = useDispatch();
	const [data, setData] = useState([]);

	const [select, columns] = useSelectColumn(
		tableColumns[tableKeys.users.add.tag],
	);

	const tagData = useMemo(() => {
		return data.map((v) => {
			return {
				...v,
				id: v.name,
				numberOfPermissions: v.permissions.length,
				[DRAGGABLE_KEY]: v.name ? v.name : v[DRAGGABLE_KEY],
			};
		});
	}, [data]);

	const onClickAddRow = useCallback(() => {
		console.log(data);
		setData([
			...data,
			{
				new: true,
				name: '',
				value: '',
				permissions: [],
				[DRAGGABLE_KEY]: tableKeys.users.add.tag + newRowIndex++,
			},
		]);
	}, [data]);

	const onClickDeleteRow = useCallback(() => {
		if (select.length) {
			setData(
				data.filter((v) => !select.map((x) => x.name).includes(v.name)),
			);
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [data, select]);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.tag,
				data: tagData,
			}),
		);
	}, [tagData, dispatch]);

	return (
		<FoldableContainer
			title={'태그 추가'}
			buttons={(isDisabled) => (
				<TitleBarButtons>
					<NormalButton onClick={onClickAddRow} disabled={isDisabled}>
						태그 추가
					</NormalButton>
					<TransparentButton
						margin='0xp 0px 0p 5px'
						disabled={isDisabled}
						onClick={onClickDeleteRow}
					>
						태그 삭제
					</TransparentButton>
				</TitleBarButtons>
			)}
		>
			<TableOptionText data={'tags'} />
			<Table
				tableKey={tableKeys.users.add.tag}
				data={tagData}
				setData={setData}
				columns={columns}
				tableRefs={tableRefs}
			/>
		</FoldableContainer>
	);
};
AddTagToUser.propTypes = {};
export default AddTagToUser;
