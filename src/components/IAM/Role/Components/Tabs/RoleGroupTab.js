import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../../../reducers/api/IAM/User/Role/roles';
import {dummyDates, dummyUsers} from '../../../../../utils/dummyData';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../../../styles/components/buttons';
import Table from '../../../../Table/Table';
import {tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import IAM_USER_GROUP from '../../../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../../../reducers/api/IAM/User/Group/groupType';
import DragContainer from '../../../../Table/DragContainer';
import TableContainer from '../../../../Table/TableContainer';
import TableOptionsBar from '../../../../Table/TableOptionsBar';
import {TableTitle} from '../../../../../styles/components/table';
import TableFold from '../../../../Table/Options/TableFold';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import {parentGroupConverter} from '../../../../../utils/tableDataConverter';
import {TabContentContainer} from '../../../../../styles/components/iam/iamTab';
import {
	FoldableContainer,
	TitleBarButtons,
} from '../../../../../styles/components/iam/iam';
// } from '../../../../../styles/components/iam/iam';
import {DRAGGABLE_KEY} from '../../../../../Constants/Table/keys';
import {CollapsbleContent} from '../../../../../styles/components/style';

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
		return [];
		// return groups
		// 	.filter((v) => role.groups.includes(v.id))
		// 	.map((v, i) => ({
		// 		...v,
		// 		type: groupTypes.find((val) => val.id === v.clientGroupTypeId)
		// 			.name,
		// 		numberOfPermissions: v.roles.length,
		// 		parentGroup: parentGroupConverter(
		// 			groups.find((val) => val.id === v.parentId)?.name,
		// 		),
		// 		grantDate: dummyDates[i],
		// 		grantUser: dummyUsers[i],
		// 		[DRAGGABLE_KEY]: v.id,
		// 	}));
	}, []);

	const excludedData = useMemo(() => {
		return [];
		// groups
		// 	.filter((v) => !role.groups.includes(v.id))
		// 	.map((v, i) => ({
		// 		...v,
		// 		type: groupTypes.find((val) => val.id === v.clientGroupTypeId)
		// 			.name,
		// 		numberOfPermissions: v.roles.length,
		// 		parentGroup: parentGroupConverter(
		// 			groups.find((val) => val.id === v.parentId)?.name,
		// 		),
		// 		grantDate: dummyDates[dummyDates.length - i - 1],
		// 		[DRAGGABLE_KEY]: v.id,
		// 	}));
	}, []);

	return (
		<TabContentContainer>
			<TableTitle>
				이 역할의 그룹: {includedData.length}
				<NormalBorderButton margin={'0px 0px 0px 5px'}>
					연결 해제
				</NormalBorderButton>
			</TableTitle>
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
				<FoldableContainer>
					<TableFold
						title={<>이 역할의 다른 그룹 : {excludedData.length}</>}
						space={'RoleGroupTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<TitleBarButtons>
							<NormalButton>그룹 생성</NormalButton>
							<NormalButton margin={'0px 0px 0px 5px'}>
								그룹 연결
							</NormalButton>
						</TitleBarButtons>
					</TableFold>
					<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
						<TableOptionText data={'groups'} />
						<TableContainer
							data={excludedData}
							tableKey={
								tableKeys.roles.summary.tabs.groups.exclude
							}
							columns={
								tableColumns[
									tableKeys.roles.summary.tabs.groups.exclude
								]
							}
						>
							<TableOptionsBar />
							<Table setSelect={setSelect} isDraggable />
						</TableContainer>
					</CollapsbleContent>
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

RoleGroupTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default RoleGroupTab;
