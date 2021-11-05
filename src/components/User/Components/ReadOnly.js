import React, {useCallback} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';
import {tableColumns} from '../../../Constants/Table/columns';
import {useSelector} from 'react-redux';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import PropTypes from 'prop-types';
import {Label} from '../../../styles/components/text';
import TableContainer from '../../Table/TableContainer';

const ReadOnly = ({isOpened, setIsOpened}) => {
	const {readOnlyData} = useSelector(CURRENT_TARGET.selector);

	const submitUserInfo = useCallback(() => {
		console.log(readOnlyData);
		console.log('api 작업..');
	}, [readOnlyData]);

	return readOnlyData['user'] ? (
		<ModalTableContainer
			title={'사용자 생성 요약보기'}
			isOpened={isOpened}
			setIsOpened={setIsOpened}
			handleSubmit={submitUserInfo}
		>
			<Label>사용자 기본정보</Label>
			<ul>
				<li>사용자 계정 : {readOnlyData['user'].id}</li>
				<li>사용자 이름 : {readOnlyData['user'].name}</li>
				<li>이메일 주소 : {readOnlyData['user'].email}</li>
				<li>전화 번호 : {readOnlyData['user'].telephone}</li>
				<li>모바일 전화 번호 : {readOnlyData['user'].mobile}</li>
			</ul>
			<div>
				그룹 :{' '}
				{readOnlyData[tableKeys.users.add.groups.exclude]?.length}
			</div>
			<TableContainer
				tableKey={tableKeys.users.add.groups.exclude}
				data={readOnlyData[tableKeys.users.add.groups.exclude]}
				columns={tableColumns[tableKeys.users.add.groups.exclude]}
			>
				<Table />
			</TableContainer>
			<div>
				권한 : {readOnlyData[tableKeys.users.add.roles.exclude].length}
			</div>
			<TableContainer
				tableKey={tableKeys.users.add.roles.exclude}
				data={readOnlyData[tableKeys.users.add.roles.exclude]}
				columns={tableColumns[tableKeys.users.add.roles.exclude]}
			>
				<Table />
			</TableContainer>

			<div>태그 : {readOnlyData[tableKeys.users.add.tag].length}</div>
			<TableContainer
				tableKey={tableKeys.users.add.tag}
				data={readOnlyData[tableKeys.users.add.tag]}
				columns={tableColumns[tableKeys.users.add.tag]}
			>
				<Table />
			</TableContainer>
		</ModalTableContainer>
	) : (
		<div />
	);
};

ReadOnly.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};

export default ReadOnly;
