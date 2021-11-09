import React, {useCallback, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import {TableSpace} from '../../../styles/components/table';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import TableOptionText from '../../Table/Options/TableOptionText';
import TableContainer from '../../Table/TableContainer';
import {AppBarButtons} from '../../../styles/components/style';

const GroupOnDescPageTags = ({groupId}) => {
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groupId,
		groups,
	]);

	const [data, setData] = useState(
		group.tags.map((v) => {
			return {
				...v,
				id: v.name,
				numberOfPermissions: v.permissions.length,
			};
		}) || [],
	);

	const [select, setSelect] = useState({});
	const onClickAddRow = useCallback(() => {
		const lastValues = data.slice().pop();
		console.log(lastValues);
		if (lastValues.name === '' || lastValues.value === '') {
			alert('입력하지 않은 값이 있습니다.');
			return;
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

	const onClickSaveRow = useCallback(() => {
		console.log(data);
	}, [data]);

	const onClickDeleteRow = useCallback(() => {
		if (select[0]) {
			console.log(select);
			setData(data.filter((v) => !select.includes(v.name)));
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [data, select]);

	return (
		<>
			<TableSpace>
				태그 추가
				<AppBarButtons>
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
				</AppBarButtons>
			</TableSpace>
			<TableOptionText data={'tags'} />
			<TableContainer
				tableKey={tableKeys.groups.summary.tabs.tags.basic}
				data={data}
				columns={tableColumns[tableKeys.groups.summary.tabs.tags.basic]}
			>
				<Table setSelect={setSelect} setData={setData} />
			</TableContainer>
		</>
	);
};

GroupOnDescPageTags.propTypes = {
	groupId: PropTypes.string,
};

export default GroupOnDescPageTags;
