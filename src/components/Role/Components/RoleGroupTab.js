import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {dummyDates, dummyUsers} from '../../../utils/dummyData';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../styles/components/buttons';
import Table from '../../Table/Table';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import DragContainer from '../../Table/DragContainer';
import TableContainer from '../../Table/TableContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';
import {TableFoldContainer, TableSpace} from '../../../styles/components/table';
import TableFold from '../../Table/Options/TableFold';
import {AppBarButtons} from '../../../styles/components/style';
import TableOptionText from '../../Table/Options/TableOptionText';
import {parentGroupConverter} from '../../../utils/tableDataConverter';

const RoleGroupTab = ({roleId, space, isFold, setIsFold}) => {
	const {roles} = useSelector(IAM_ROLES.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);

	const role = useMemo(() => roles.find((v) => v.id === roleId), [
		roles,
		roleId,
	]);

	const includedData = useMemo(() => {
		return groups
			.filter((v) => role.groups.includes(v.id))
			.map((v, i) => ({
				...v,
				type: groupTypes.find((val) => val.id === v.clientGroupTypeId)
					.name,
				numberOfPermissions: v.roles.length,
				parentGroup: parentGroupConverter(
					groups.find((val) => val.id === v.parentId)?.name,
				),
				grantDate: dummyDates[i],
				grantUser: dummyUsers[i],
			}));
	}, [groupTypes, groups, role]);

	const excludedData = useMemo(
		() =>
			groups
				.filter((v) => !role.groups.includes(v.id))
				.map((v, i) => ({
					...v,
					type: groupTypes.find(
						(val) => val.id === v.clientGroupTypeId,
					).name,
					numberOfPermissions: v.roles.length,
					parentGroup: parentGroupConverter(
						groups.find((val) => val.id === v.parentId)?.name,
					),
					grantDate: dummyDates[dummyDates.length - i - 1],
				})),
		[groupTypes, groups, role],
	);

	return (
		<>
			<TableSpace>
				이 역할의 그룹: {includedData.length}{' '}
				<NormalBorderButton margin={'0px 0px 0px 8px'}>
					연결 해제
				</NormalBorderButton>
			</TableSpace>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.groups.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<TableContainer
					data={includedData}
					tableKey={tableKeys.roles.summary.tabs.groups.include}
					columns={
						tableColumns[
							tableKeys.roles.summary.tabs.groups.include
						]
					}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
				<TableFoldContainer>
					<TableFold
						title={<>이 역할의 다른 그룹 : {excludedData.length}</>}
						space={'RoleGroupTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<AppBarButtons>
							<NormalButton>그룹 생성</NormalButton>
							<NormalButton margin={'0px 0px 0px 8px'}>
								그룹 연결
							</NormalButton>
						</AppBarButtons>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'groups'} />
							<TableContainer
								data={excludedData}
								tableKey={
									tableKeys.roles.summary.tabs.groups.exclude
								}
								columns={
									tableColumns[
										tableKeys.roles.summary.tabs.groups
											.exclude
									]
								}
							>
								<TableOptionsBar />
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
						</>
					)}
				</TableFoldContainer>
			</DragContainer>
		</>
	);
};

RoleGroupTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default RoleGroupTab;
