import React, {useCallback, useMemo} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';
import {tableColumns} from '../../../Constants/Table/columns';
import {useSelector} from 'react-redux';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import PropTypes from 'prop-types';
import {LiText} from '../../../styles/components/text';
import {dummyPolicyOnDialogBox} from '../../../utils/dummyData';
import TableContainer from '../../Table/TableContainer';
import {rolesConverter} from '../../../utils/tableDataConverter';
import {SummaryList} from '../../../styles/components/iam/descriptionPage';
import {TitleBar} from '../../../styles/components/iam/iam';
import {AddPageDialogBoxTitle} from '../../../styles/components/iam/addPage';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';

const UserPreviewDialogBox = ({isOpened, setIsOpened}) => {
	const {readOnlyData} = useSelector(CURRENT_TARGET.selector);

	const submitUserInfo = useCallback(() => {
		console.log(readOnlyData);
		IAM_USER.asyncAction.createAction({
			id: readOnlyData['user'].id,
			name: readOnlyData['user'].name,
			password: 'Netand141)', // 비밀번호는 생성 규칙에 따라 랜덤생성이며 사용자 이메일로 발송. 현재는 임의값.
			email: readOnlyData['user'].email,
			telephone: readOnlyData['user'].telephone,
			mobile: readOnlyData['user'].mobile,
		});
	}, [readOnlyData]);

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
			<TitleBar>사용자 기본정보</TitleBar>
			<SummaryList>
				<LiText>사용자 계정 : {readOnlyData['user'].id}</LiText>
				<LiText>사용자 이름 : {readOnlyData['user'].name}</LiText>
				<LiText>이메일 주소 : {readOnlyData['user'].email}</LiText>
				<LiText>전화 번호 : {readOnlyData['user'].telephone}</LiText>
				<LiText>
					모바일 전화 번호 : {readOnlyData['user'].mobile}
				</LiText>
			</SummaryList>

			<AddPageDialogBoxTitle>
				그룹 :{' '}
				{readOnlyData[tableKeys.users.add.groups.exclude]?.length}
			</AddPageDialogBoxTitle>
			<TableContainer
				mode={'readOnly'}
				tableKey={tableKeys.users.add.groups.exclude}
				data={groupData}
				columns={tableColumns[tableKeys.users.add.groups.exclude]}
			>
				<Table />
			</TableContainer>

			<AddPageDialogBoxTitle>
				권한 : {dummyPolicyOnDialogBox.length}
			</AddPageDialogBoxTitle>
			<TableContainer
				mode={'readOnly'}
				tableKey={tableKeys.users.add.permissions}
				data={dummyPolicyOnDialogBox}
				columns={tableColumns[tableKeys.users.add.permissions]}
			>
				<Table />
			</TableContainer>

			<AddPageDialogBoxTitle>
				태그 : {readOnlyData[tableKeys.users.add.tag].length}
			</AddPageDialogBoxTitle>
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

UserPreviewDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};

export default UserPreviewDialogBox;
