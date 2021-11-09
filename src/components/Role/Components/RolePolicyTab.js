import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import Table from '../../Table/Table';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {dummyPermission} from '../../../utils/dummyData';
import TableContainer from '../../Table/TableContainer';
import DragContainer from '../../Table/DragContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';
import {TableFoldContainer, TableSpace} from '../../../styles/components/table';
import TableFold from '../../Table/Options/TableFold';
import {AppBarButtons} from '../../../styles/components/style';
import TableOptionText from '../../Table/Options/TableOptionText';

const RolePolicyTab = ({roleId, space, isFold, setIsFold}) => {
	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);

	const excludedData = useMemo(() => dummyPermission.slice(0, 2), []);
	const includedData = useMemo(() => dummyPermission.slice(2), []);

	return (
		<>
			<TableSpace>
				이 역할의 정책: {excludedData.length}
				<TransparentButton margin={'0px 0px 0px 5px'}>
					연결 해제
				</TransparentButton>
			</TableSpace>
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
				<TableFoldContainer>
					<TableFold
						title={<>이 역할의 다른 정책: {includedData.length}</>}
						space={'RolePolicyTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<AppBarButtons>
							<NormalButton>정책 생성</NormalButton>
							<NormalButton margin={'0px 0px 0px 5px'}>
								정책 연결
							</NormalButton>
						</AppBarButtons>
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
				</TableFoldContainer>
			</DragContainer>
		</>
	);
};

RolePolicyTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default RolePolicyTab;
