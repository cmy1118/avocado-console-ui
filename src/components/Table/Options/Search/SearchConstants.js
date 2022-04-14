import {tableKeys} from '../../../../Constants/Table/keys';
import React from 'react';
import PropTypes from 'prop-types';
import {FormProvider, useForm} from 'react-hook-form';
import RHF_Textbox from "../../../RecycleComponents/ReactHookForm/RHF_Textbox";
import {Icon} from "../../../../styles/components/icons";
import {searchIcon} from "../../../../icons/icons";

export const placeholders = {
	[tableKeys.users.basic]: '사용자 계정, 사용자 이름, 사용자 그룹, 태그명',
	[tableKeys.users.add.groups.exclude]: '그룹 이름',
	[tableKeys.users.add.roles.exclude]: '역할 이름',
	[tableKeys.users.summary.tabs.groups.include]: '그룹명, 그룹 유형',
	[tableKeys.users.summary.tabs.groups.exclude]: '그룹명, 그룹 유형',
	[tableKeys.users.summary.tabs.roles.include]: '역할 이름, 설명',
	[tableKeys.users.summary.tabs.roles.exclude]: '역할 이름, 설명',
	[tableKeys.users.summary.tabs.tags.permissions.include]: '정책 이름, 설명',
	[tableKeys.users.summary.tabs.tags.permissions.exclude]: '정책 이름, 설명',
	[tableKeys.groups.basic]: '그룹 이름, 그룹 유형, 권한',
	[tableKeys.groups.add.users.exclude]: '사용자 계정, 사용자 이름',
	[tableKeys.groups.add.roles.exclude]: '역할 이름, 설명',
	[tableKeys.groups.summary.tabs.users.include]: '사용자 계정, 사용자 이름',
	[tableKeys.groups.summary.tabs.users.exclude]: '사용자 계정, 사용자 이름',
	[tableKeys.groups.summary.tabs.roles.include]: '역할 이름, 설명',
	[tableKeys.groups.summary.tabs.roles.exclude]: '역할 이름, 설명',
	[tableKeys.groups.summary.tabs.tags.permissions.include]: '정책 이름, 설명',
	[tableKeys.groups.summary.tabs.tags.permissions.exclude]: '정책 이름, 설명',
	[tableKeys.roles.basic]: '그룹 이름, 그룹 유형, 권한',
	[tableKeys.roles.summary.tabs.permissions.include]: '정책 이름, 설명',
	[tableKeys.roles.summary.tabs.permissions.exclude]: '정책 이름, 설명',
	[tableKeys.roles.summary.tabs.users.include]: '사용자 계정, 사용자 이름',
	[tableKeys.roles.summary.tabs.users.exclude]: '사용자 계정, 사용자 이름',
	[tableKeys.roles.summary.tabs.groups.include]: '그룹 이름, 그룹 유형',
	[tableKeys.roles.summary.tabs.groups.exclude]: '그룹 이름, 그룹 유형',
};

function Search({tableKey, setGlobalFilter, setSearch}) {
	const handleSubmit = (data) => {
		//Api 검색
		console.log("data['search'].trim():", data['search'].trim());
		setSearch(data['search'].trim());
		//setGlobalFilter  : React Table String Search 방법
		//상세 Tab 검색시 사용
		// setGlobalFilter(data['search'].trim());
	};

	const methods = useForm();

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<RHF_Textbox
					name={'search'}
					placeholder={placeholders[tableKey]}
					front={
						<Icon size={'sm'} margin_right={'0px'}>
							{searchIcon}
						</Icon>
					}
				/>
			</form>
		</FormProvider>
	);
}
Search.propTypes = {
	tableKey: PropTypes.string,
	setGlobalFilter: PropTypes.func,
	setSearch: PropTypes.func,
};
export default Search;
