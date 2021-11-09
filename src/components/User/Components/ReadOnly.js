import React, {useCallback, useMemo} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';
import {tableColumns} from '../../../Constants/Table/columns';
import {useSelector} from 'react-redux';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import PropTypes from 'prop-types';
import {LiText} from '../../../styles/components/text';
import {
	SubHeader,
	SummaryList,
	SummaryPageSubHeader,
} from '../../../styles/components/style';
import {dummyPolicyOnDialogBox} from '../../../utils/dummyData';
import TableContainer from '../../Table/TableContainer';
import {rolesConverter} from '../../../utils/tableDataConverter';

const ReadOnly = ({isOpened, setIsOpened}) => {
	const {readOnlyData} = useSelector(CURRENT_TARGET.selector);

	const submitUserInfo = useCallback(() => {
		// console.log(readOnlyData);
		// console.log('api 작업..');
	}, []);

	const groupData = useMemo(
		() =>
			readOnlyData[tableKeys.users.add.groups.exclude]?.map((v) => ({
				...v,
				roles: rolesConverter(v.roles),
			})),
		[readOnlyData],
	);

	return readOnlyData['user'] ? (
		<ModalTableContainer
			title={'사용자 생성 요약보기'}
			isOpened={isOpened}
			setIsOpened={setIsOpened}
			handleSubmit={submitUserInfo}
		>
			<SubHeader>사용자 기본정보</SubHeader>
			<SummaryList>
				<LiText>사용자 계정 : {readOnlyData['user'].id}</LiText>
				<LiText>사용자 이름 : {readOnlyData['user'].name}</LiText>
				<LiText>이메일 주소 : {readOnlyData['user'].email}</LiText>
				<LiText>전화 번호 : {readOnlyData['user'].telephone}</LiText>
				<LiText>
					모바일 전화 번호 : {readOnlyData['user'].mobile}
				</LiText>
			</SummaryList>

			<SummaryPageSubHeader>
				그룹 :{' '}
				{readOnlyData[tableKeys.users.add.groups.exclude]?.length}
			</SummaryPageSubHeader>
			<TableContainer
				mode={'readOnly'}
				tableKey={tableKeys.users.add.groups.exclude}
				data={groupData}
				columns={tableColumns[tableKeys.users.add.groups.exclude]}
			>
				<Table />
			</TableContainer>

			<SummaryPageSubHeader>
				권한 : {dummyPolicyOnDialogBox.length}
			</SummaryPageSubHeader>
			<TableContainer
				mode={'readOnly'}
				tableKey={tableKeys.users.add.permissions}
				data={dummyPolicyOnDialogBox}
				columns={tableColumns[tableKeys.users.add.permissions]}
			>
				<Table />
			</TableContainer>

			<SummaryPageSubHeader>
				태그 : {readOnlyData[tableKeys.users.add.tag].length}
			</SummaryPageSubHeader>
			<TableContainer
				mode={'readOnly'}
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
