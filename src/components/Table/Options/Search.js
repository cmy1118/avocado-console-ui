import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Form from '../../RecycleComponents/New/Form';
import TextBox from '../../RecycleComponents/New/TextBox';
import {searchIcon} from '../../../icons/icons';
import {Icon} from '../../../styles/components/icons';
import {tableKeys} from '../../../Constants/Table/keys';

const placeholders = {
	[tableKeys.users.basic]: '사용자 계정, 사용자 이름, 그룹 ,태그명',
	[tableKeys.users.add.groups.exclude]: '그룹 이름',
	[tableKeys.users.add.roles.exclude]: '역할 이름',
	[tableKeys.users.summary.tabs.groups.include]: '그룹명, 그룹 유형',
	[tableKeys.users.summary.tabs.groups.exclude]: '그룹명, 그룹 유형',
	[tableKeys.users.summary.tabs.roles.include]: '역할 이름, 설명',
	[tableKeys.users.summary.tabs.roles.exclude]: '역할 이름, 설명',
	[tableKeys.users.summary.tabs.tags.permissions.include]: '정책 이름, 설명',
	[tableKeys.users.summary.tabs.tags.permissions.exclude]: '정책 이름, 설명',
	[tableKeys.groups.basic]: '그룹 이름, 그룹 유형 권한',
	[tableKeys.groups.add.users.exclude]: '사용자 계정, 사용자 이름',
	[tableKeys.groups.add.roles.exclude]: '역할 이름, 설명',
	[tableKeys.groups.summary.tabs.users.include]: '사용자 계정, 사용자 이름',
	[tableKeys.groups.summary.tabs.users.exclude]: '사용자 계정, 사용자 이름',
	[tableKeys.groups.summary.tabs.roles.include]: '역할 이름, 설명',
	[tableKeys.groups.summary.tabs.roles.exclude]: '역할 이름, 설명',
	[tableKeys.groups.summary.tabs.tags.permissions.include]: '정책 이름, 설명',
	[tableKeys.groups.summary.tabs.tags.permissions.exclude]: '정책 이름, 설명',
	[tableKeys.roles.basic]: '그룹 이름, 그룹 유형 권한',
	[tableKeys.roles.summary.tabs.permissions.include]: '정책 이름, 설명',
	[tableKeys.roles.summary.tabs.permissions.exclude]: '정책 이름, 설명',
	[tableKeys.roles.summary.tabs.users.include]: '사용자 계정, 사용자 이름',
	[tableKeys.roles.summary.tabs.users.exclude]: '사용자 계정, 사용자 이름',
	[tableKeys.roles.summary.tabs.groups.include]: '그룹 이름, 그룹 유형',
	[tableKeys.roles.summary.tabs.groups.exclude]: '그룹 이름, 그룹 유형',
};

function Search({tableKey, setGlobalFilter}) {
	const ref = useRef(null);
	const handleSubmit = (data) => {
		console.log('api');
		console.log('tableKey', tableKey);
		console.log('data', data);
		setGlobalFilter(data['search']);
	};

	return (
		<Form
			onSubmit={handleSubmit}
			innerRef={ref}
			initialValues={{search: ''}}
		>
			<TextBox
				placeholder={placeholders[tableKey]}
				front={
					<Icon size={'sm'} margin_right={'0px'}>
						{searchIcon}
					</Icon>
				}
				name={'search'}
			/>
		</Form>
	);
}
Search.propTypes = {
	tableKey: PropTypes.string,
	setGlobalFilter: PropTypes.func,
};
export default Search;
