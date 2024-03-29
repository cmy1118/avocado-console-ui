import React from 'react';
import styled from 'styled-components';
import {avocadoLogo_white, searchIcon} from '../../icons/icons';
import {Icon} from '../../styles/components/icons';
import MenuButtons from './MenuButtons';
import {NavItem} from '../../styles/components/nav';
import {FormProvider, useForm} from 'react-hook-form';
import RHF_Textbox from '../RecycleComponents/ReactHookForm/RHF_Textbox';

const _Container = styled.div`
	height: 44px;
	min-height: 44px;
	background: #178082;
	display: flex;
	justify-content: space-between;
	padding: 0px 16px;
	align-items: center;
	box-shadow: 0 3.5px 5.5px 0 rgba(0, 0, 0, 0.13);
`;

const _Title = styled.div`
	display: flex;
`;

const _Logo = styled.div`
	align-items: center;
	display: flex;
	justify-content: flex-start;
`;

const header = {search: {placeholder: '제품 및 리소스 검색'}};

const Header = () => {
	const methods = useForm();

	return (
		<_Container>
			<_Title>
				<NavItem to='/'>
					<_Logo>{avocadoLogo_white}</_Logo>
				</NavItem>
			</_Title>
			<FormProvider {...methods}>
				<RHF_Textbox
					// placeholder_text_color={'#D7D7D7'}
					// border_color={'#0B6365'}
					placeholder={header.search.placeholder}
					// placeholder_text_color={'rgba(255, 255, 255, 0.6)'}
					// background={'rgba(0, 0, 0, 0.22)'}
					front={
						<Icon
							color={'rgba(255, 255, 255, 0.6)'}
							size={'14.2px'}
							margin_right={'0px'}
						>
							{searchIcon}
						</Icon>
					}
					onSubmit={methods.handleSubmit((data) => console.log(data))}
					name={'search'}
				/>
			</FormProvider>
			{/*<Form*/}
			{/*	onSubmit={(data) => console.log(data)}*/}
			{/*	innerRef={ref}*/}
			{/*	initialValues={{search: ''}}*/}
			{/*>*/}
			{/*	<TextBox*/}
			{/*		// placeholder_text_color={'#D7D7D7'}*/}
			{/*		// border_color={'#0B6365'}*/}
			{/*		placeholder={header.search.placeholder}*/}
			{/*		placeholder_text_color={'rgba(255, 255, 255, 0.6)'}*/}
			{/*		background={'rgba(0, 0, 0, 0.22)'}*/}
			{/*		front={*/}
			{/*			<Icon*/}
			{/*				color={'rgba(255, 255, 255, 0.6)'}*/}
			{/*				size={'14.2px'}*/}
			{/*				margin_right={'0px'}*/}
			{/*			>*/}
			{/*				{searchIcon}*/}
			{/*			</Icon>*/}
			{/*		}*/}
			{/*		name={'search'}*/}
			{/*	/>*/}
			{/*</Form>*/}
			<MenuButtons />
		</_Container>
	);
};

export default Header;
