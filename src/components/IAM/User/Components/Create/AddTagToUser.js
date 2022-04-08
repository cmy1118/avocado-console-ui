import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import {useDispatch} from 'react-redux';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import TableFold from '../../../../Table/Options/TableFold';
import {
	FoldableContainer,
	TitleBarButtons,
} from '../../../../../styles/components/iam/iam';
import {CollapsbleContent} from '../../../../../styles/components/style';
import useSelectColumn from '../../../../../hooks/table/useSelectColumn';

const AddTagToUser = ({space, isFold, setIsFold}) => {
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
				[DRAGGABLE_KEY]: v.name
					? v.name
					: `${tableKeys.users.add.tag} ${data.length}`,
			};
		});
	}, [data]);

	const onClickAddRow = useCallback(() => {
		console.log(data);
		const lastValues = data.slice().pop();
		if (lastValues) {
			if (lastValues.name === '' || lastValues.value === '') {
				alert('입력하지 않은 값이 있습니다.');
				return;
			}
		}
		setData([
			...data,
			{
				name: '',
				value: '',
				permissions: [],
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
		<FoldableContainer>
			<TableFold
				title={'태그 추가'}
				space={'AddTagToUser'}
				isFold={isFold}
				setIsFold={setIsFold}
			>
				<TitleBarButtons>
					<NormalButton onClick={onClickAddRow}>
						태그 추가
					</NormalButton>
					<TransparentButton
						margin='0xp 0px 0p 5px'
						onClick={onClickDeleteRow}
					>
						태그 삭제
					</TransparentButton>
				</TitleBarButtons>
			</TableFold>

			<CollapsbleContent height={isFold[space] ? '358px' : '0px'}>
				<TableOptionText data={'tags'} />
				<Table
					tableKey={tableKeys.users.add.tag}
					data={tagData}
					setData={setData}
					columns={columns}
				/>
			</CollapsbleContent>
		</FoldableContainer>
	);
};
AddTagToUser.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};
export default AddTagToUser;
