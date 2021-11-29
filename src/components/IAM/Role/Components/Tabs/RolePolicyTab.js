import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import Table from '../../../../Table/Table';
import {tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import {dummyPermission} from '../../../../../utils/dummyData';
import TableContainer from '../../../../Table/TableContainer';
import DragContainer from '../../../../Table/DragContainer';
import TableOptionsBar from '../../../../Table/TableOptionsBar';
import {TableTitle} from '../../../../../styles/components/table';
import TableFold from '../../../../Table/Options/TableFold';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../styles/components/iam/iamTab';
import {
	FoldableContainer,
	TitleBarButtons,
} from '../../../../../styles/components/iam/iam';
import IAM_USER_GROUP from '../../../../../reducers/api/IAM/User/Group/group';
import {useDispatch, useSelector} from 'react-redux';
import PAGINATION from '../../../../../reducers/pagination';
import IAM_ROLES from '../../../../../reducers/api/IAM/User/Role/roles';
import PAM_POLICY from '../../../../../reducers/api/ PAM/Role/policy';

const RolePolicyTab = ({roleId, space, isFold, setIsFold, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);

	const [inPolicy, setInPolicy] = useState(null);
	const [exPolicy, setExPolicy] = useState(null);

	const excludedData = useMemo(() => [], []);
	const includedData = useMemo(() => [], []);

	//역할에 포함 정책 템플릿을 조회한다.
	useEffect(() => {
		if (!isSummaryOpened) {
			dispatch(
				PAM_POLICY.asyncAction.findByRoleIdAction({roleId: roleId}),
			);
			// dispatch(
			// 	IAM_ROLES.asyncAction.findTemplatesAction({
			// 		range:
			// 			page[tableKeys.roles.summary.tabs.permissions.include],
			// 		include: true,
			// 	}),
			// )
			// 	.unwrap()
			// 	.then((res) => setInPolicy(res));
		}
	}, [dispatch, roleId, isSummaryOpened, page]);

	//역할에 미포함 정책 템플릿을 조회한다.
	useEffect(() => {
		if (
			!isSummaryOpened &&
			page[tableKeys.users.summary.tabs.groups.include]
		) {
			dispatch(
				IAM_ROLES.asyncAction.findTemplatesAction({
					range:
						page[tableKeys.roles.summary.tabs.permissions.include],
					include: false,
				}),
			)
				.unwrap()
				.then((res) => setExPolicy(res));
		}
	}, [dispatch, isSummaryOpened, page]);

	return (
		<TabContentContainer>
			<TableTitle>
				이 역할의 정책: {excludedData.length}
				<TransparentButton margin={'0px 0px 0px 5px'}>
					연결 해제
				</TransparentButton>
			</TableTitle>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.permissions.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<TableContainer
					data={excludedData}
					tableKey={tableKeys.roles.summary.tabs.permissions.include}
					columns={
						tableColumns[
							tableKeys.roles.summary.tabs.permissions.include
						]
					}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
				<FoldableContainer>
					<TableFold
						title={<>이 역할의 다른 정책: {includedData.length}</>}
						space={'RolePolicyTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<TitleBarButtons>
							<NormalButton>정책 생성</NormalButton>
							<NormalButton margin={'0px 0px 0px 5px'}>
								정책 연결
							</NormalButton>
						</TitleBarButtons>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'policies'} />
							<TableContainer
								data={includedData}
								tableKey={
									tableKeys.roles.summary.tabs.permissions
										.exclude
								}
								columns={
									tableColumns[
										tableKeys.roles.summary.tabs.permissions
											.exclude
									]
								}
							>
								<TableOptionsBar />
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
						</>
					)}
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

RolePolicyTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default RolePolicyTab;
