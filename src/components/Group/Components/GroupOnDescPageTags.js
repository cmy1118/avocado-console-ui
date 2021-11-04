import React, {useCallback, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../styles/components/buttons';
import {dummyPermission} from '../../../utils/dummyData';

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

	const [select, setSelect] = useState([]);

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
			<div>태그 추가</div>

			<div>
				<NormalButton onClick={onClickAddRow}>태그 추가</NormalButton>
				<NormalButton onClick={onClickSaveRow}>태그 저장</NormalButton>
				<NormalBorderButton onClick={onClickDeleteRow}>
					태그 삭제
				</NormalBorderButton>
			</div>
			<Table
				tableKey={tableKeys.groups.summary.tabs.tags.basic}
				data={data}
				columns={tableColumns[tableKeys.groups.summary.tabs.tags.basic]}
				isSelectable
				setData={setData} // data 내부의 값을 조작할 필요가 있는경우
				setSelect={setSelect}
			/>

			{select[tableKeys.groups.summary.tabs.tags.basic]?.length === 1 && (
				<div>
					<div>
						<div>
							태그 [
							{
								select[
									tableKeys.groups.summary.tabs.tags.basic
								][0].name
							}
							:
							{
								select[
									tableKeys.groups.summary.tabs.tags.basic
								][0].value
							}
							]의 정책:
						</div>
						<NormalBorderButton>연결 해제</NormalBorderButton>
					</div>
					<Table
						tableKey={
							tableKeys.users.summary.tabs.tags.permissions
								.include
						}
						data={dummyPermission.filter((v) =>
							select[
								tableKeys.groups.summary.tabs.tags.basic
							][0].permissions.includes(v.id),
						)}
						columns={
							tableColumns[
								tableKeys.users.summary.tabs.tags.permissions
									.include
							]
						}
					/>
					<div>
						<div>
							태그 [
							{
								select[
									tableKeys.groups.summary.tabs.tags.basic
								][0].name
							}
							:
							{
								select[
									tableKeys.groups.summary.tabs.tags.basic
								][0].value
							}
							]의 다른 정책:
						</div>
						<NormalButton>정책 생성</NormalButton>
						<NormalButton>정책 연결</NormalButton>
					</div>
					<Table
						tableKey={
							tableKeys.groups.summary.tabs.tags.permissions
								.exclude
						}
						data={dummyPermission.filter(
							(v) =>
								!select[
									tableKeys.groups.summary.tabs.tags.basic
								][0].permissions.includes(v.id),
						)}
						columns={
							tableColumns[
								tableKeys.groups.summary.tabs.tags.permissions
									.exclude
							]
						}
					/>
				</div>
			)}
		</>
	);
};

GroupOnDescPageTags.propTypes = {
	groupId: PropTypes.string,
};

export default GroupOnDescPageTags;
