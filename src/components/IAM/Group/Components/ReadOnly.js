import React, {useCallback} from 'react';
import ModalTableContainer from '../../../RecycleComponents/ModalTableContainer';
import {tableKeys} from '../../../../Constants/Table/keys';
import Table from '../../../Table/Table';
import {tableColumns} from '../../../../Constants/Table/columns';
import {useSelector} from 'react-redux';
import CURRENT_TARGET from '../../../../reducers/currentTarget';
import PropTypes from 'prop-types';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import TableContainer from '../../../Table/TableContainer';

const ReadOnly = ({isOpened, setIsOpened}) => {
	const {readOnlyData} = useSelector(CURRENT_TARGET.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const submitUserInfo = useCallback(() => {
		console.log(readOnlyData);
		console.log('api 작업..');
	}, [readOnlyData]);

	return readOnlyData['group'] ? (
		<ModalTableContainer
			title={'사용자 그룹 생성 요약보기'}
			isOpened={isOpened}
			setIsOpened={setIsOpened}
			handleSubmit={submitUserInfo}
		>
			<ul>
				<li>
					사용자 그룹 유형 :{' '}
					{
						groupTypes.find(
							(v) => v.id === readOnlyData['group'].groupType,
						).name
					}
				</li>
				<li>사용자 그룹 이름 : {readOnlyData['group'].name}</li>
				<li>상위 그룹 : 없음</li>
			</ul>
			<div>
				사용자 :{' '}
				{readOnlyData[tableKeys.groups.add.users.exclude]?.length}
			</div>
			<TableContainer
				mode={'readOnly'}
				tableKey={tableKeys.groups.add.users.exclude}
				columns={tableColumns[tableKeys.groups.add.users.exclude]}
				data={readOnlyData[tableKeys.groups.add.users.exclude]}
			>
				<Table />
			</TableContainer>
			<div>
				권한 : {readOnlyData[tableKeys.groups.add.roles.include].length}
			</div>
			<TableContainer
				mode={'readOnly'}
				tableKey={tableKeys.groups.add.roles.include}
				data={readOnlyData[tableKeys.groups.add.roles.include]}
				columns={tableColumns[tableKeys.groups.add.roles.include]}
			>
				<Table />
			</TableContainer>

			<div>태그 : {readOnlyData[tableKeys.groups.add.tag].length}</div>
			<TableContainer
				mode={'readOnly'}
				tableKey={tableKeys.groups.add.tag}
				data={readOnlyData[tableKeys.groups.add.tag]}
				columns={tableColumns[tableKeys.groups.add.tag]}
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
