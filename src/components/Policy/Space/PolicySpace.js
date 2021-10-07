import React, {useMemo} from 'react';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';
import DnDTable from '../../Table/DndTable/DnDTable';
import {useSelector} from 'react-redux';
import {settingSelector} from '../../../reducers/setting';
import {
	groupReader,
	passwordExpiryTimeReader,
	statusReader,
} from '../../../utils/reader';

const PolicySpace = () => {
	const {data1, data2} = useSelector(settingSelector.all);

	const columns = [
		{
			Header: 'id',
			accessor: 'id',
		},
		{
			Header: 'name',
			accessor: 'name',
		},
	];

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
			</PathContainer>
			<div>Rolicy Space</div>
			<div style={{display: 'flex'}}>
				<DnDTable
					tableKey={'table1'}
					columns={columns}
					data={data1}
					isSelectable={true}
					between={'1'}
				/>
				<DnDTable
					tableKey={'table2'}
					columns={columns}
					data={data2}
					between={'1'}
				/>
			</div>
		</IamContainer>
	);
};

export default PolicySpace;
