import React, {useCallback, useEffect, useRef, useState} from 'react';
import Table from '../../../Table/Table';
import {tableColumns} from '../../../../Constants/Table/columns';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import CURRENT_TARGET from '../../../../reducers/currentTarget';
import {useDispatch} from 'react-redux';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import TableOptionText from '../../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import {TitleBarButtons} from '../../../../styles/components/iam/iam';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';
import FoldableContainer from '../../../Table/Options/FoldableContainer';

const AddTagToGroup = ({setValue}) => {
	const tableRefs = useRef([]);
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [select, columns] = useSelectColumn(
		tableColumns[tableKeys.groups.add.tag],
		data,
	);
	// const [select, setSelect] = useState({});
	const onClickAddRow = useCallback(() => {
		setData([
			...data,
			{
				new: true,
				name: '',
				value: '',
				permissions: [],
				[DRAGGABLE_KEY]: `${tableKeys.groups.add.tag} ${data.length}1`,
			},
		]);
	}, [data]);

	const onClickDeleteRow = useCallback(() => {
		//	console.log(select[tableKeys.groups.add.tag]);
		console.log(select);
		setData((prev) =>
			prev.filter((v) => !select.map((s) => s.id).includes(v.id)),
		);
		//	console.log('삭제 처리 필요');
	}, [select]);

	// const tagData = useMemo(() => {
	// 	return data.map((v) => {
	// 		return {
	// 			...v,
	// 			// id: v?.name,
	// 			// numberOfPermissions: v?.permissions.length,
	// 			[DRAGGABLE_KEY]: v.,
	// 			numberOfRoles: v?.permissions.length,
	// 		};
	// 	});
	// }, [data]);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.groups.add.tag,
				data: data,
			}),
		);
	}, [data, dispatch]);

	useEffect(() => {
		setValue(data);
	}, [data, setValue]);

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
						onClick={onClickDeleteRow}
						disabled={isDisabled}
					>
						태그 삭제
					</TransparentButton>
				</TitleBarButtons>
			)}
		>
			<TableOptionText data={'tags'} />
			<Table
				tableKey={tableKeys.groups.add.tag}
				data={data}
				setData={setData}
				columns={columns}
				tableRefs={tableRefs}
			/>
		</FoldableContainer>
	);
};
AddTagToGroup.propTypes = {
	setValue: PropTypes.func,
};
export default AddTagToGroup;
